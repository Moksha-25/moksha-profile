/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Skill {
  name: string;
  level: number; // Percentage: 0 to 100
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  bullets: string[];
  githubUrl: string;
  demoUrl?: string;
  category: string;
  image: string; // Background visual illustration
  tags: string[];
}

export interface Education {
  degree: string;
  institution: string;
  duration: string;
  grade?: string;
  details?: string;
}

export interface Achievement {
  title: string;
  description: string;
  badge?: string;
}
