import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma';

export const register = async (req: Request, res: Response): Promise<void> => {
// ... implementation retained ...
  try {
    const { email, password, name, role } = req.body;
    
    // Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
       res.status(400).json({ message: 'User already exists' });
       return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: role || 'STUDENT',
      },
    });

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: { id: user.id, email: user.email, name: user.name, role: user.role }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
// ... implementation retained ...
  try {
    const { email, password } = req.body;
    
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || (!user.password && user.googleId)) {
      res.status(401).json({ message: 'Invalid credentials. Please use Google Login.' });
      return; // If they only have Google login and no password
    }

    const isValid = await bcrypt.compare(password, user.password as string);
    if (!isValid) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: { id: user.id, email: user.email, name: user.name, role: user.role }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const googleLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { idToken } = req.body;
    
    // Validate token against Google endpoints
    const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`);
    if (!response.ok) {
       res.status(401).json({ message: 'Invalid Google Token' });
       return;
    }

    const payload = await response.json();
    const { email, name, sub } = payload; // sub is the googleId

    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      // Auto-register via Google
      user = await prisma.user.create({
        data: {
          email,
          name,
          googleId: sub,
          role: 'STUDENT',
        },
      });
    } else if (!user.googleId) {
      // Link Google ID if email exists
      user = await prisma.user.update({
        where: { id: user.id },
        data: { googleId: sub, name: user.name || name }
      });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' }
    );

    res.status(200).json({
      message: 'Google Login successful',
      token,
      user: { id: user.id, email: user.email, name: user.name, role: user.role }
    });

  } catch (error) {
     res.status(500).json({ message: 'Failed to authenticate with Google' });
  }
};

export const getMe = async (req: Request, res: Response): Promise<void> => {
// ... implementation retained ...
  try {
    const userId = (req as any).user.userId;
    const user = await prisma.user.findUnique({ 
      where: { id: userId },
      select: { id: true, email: true, name: true, role: true }
    });
    
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
