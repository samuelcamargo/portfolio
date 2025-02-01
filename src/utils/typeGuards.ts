import { Certificate, Skill, Experience } from '@/domain/types/about';

// Type Guards para verificar tipos de dados
export function isSkill(item: unknown): item is Skill {
  return (
    typeof item === 'object' &&
    item !== null &&
    'name' in item &&
    'level' in item &&
    'category' in item
  );
}

export function isCertificate(item: unknown): item is Certificate {
  return (
    typeof item === 'object' &&
    item !== null &&
    'name' in item &&
    'platform' in item &&
    'date' in item &&
    'url' in item &&
    'category' in item
  );
}

export function isExperience(item: unknown): item is Experience {
  return (
    typeof item === 'object' &&
    item !== null &&
    'role' in item &&
    'company' in item &&
    'period' in item &&
    'description' in item
  );
}

// Type Guards para validar valores específicos
export function isValidLevel(level: string): level is Skill['level'] {
  return ['Básico', 'Intermediário', 'Avançado', 'Especialista'].includes(level);
}

export function isValidCategory(category: string): category is Skill['category'] {
  return ['Frontend', 'Backend', 'DevOps', 'Database', 'Arquitetura', 'Gestão'].includes(category);
}

export function isValidDate(date: string): boolean {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) return false;
  
  const parsedDate = new Date(date);
  return !isNaN(parsedDate.getTime());
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// Type Guards para arrays
export function isSkillArray(items: unknown[]): items is Skill[] {
  return items.every(isSkill);
}

export function isCertificateArray(items: unknown[]): items is Certificate[] {
  return items.every(isCertificate);
}

export function isExperienceArray(items: unknown[]): items is Experience[] {
  return items.every(isExperience);
}

// Funções de validação compostas
export function validateSkill(skill: Partial<Skill>): skill is Skill {
  return (
    typeof skill.name === 'string' &&
    skill.name.length > 0 &&
    isValidLevel(skill.level as string) &&
    isValidCategory(skill.category as string)
  );
}

export function validateCertificate(cert: Partial<Certificate>): cert is Certificate {
  return (
    typeof cert.name === 'string' &&
    cert.name.length > 0 &&
    typeof cert.platform === 'string' &&
    cert.platform.length > 0 &&
    isValidDate(cert.date as string) &&
    isValidUrl(cert.url as string) &&
    typeof cert.category === 'string' &&
    cert.category.length > 0
  );
}

// Funções auxiliares de type narrowing
export function assertIsSkill(item: unknown): asserts item is Skill {
  if (!isSkill(item)) {
    throw new Error('Item não é uma habilidade válida');
  }
}

export function assertIsCertificate(item: unknown): asserts item is Certificate {
  if (!isCertificate(item)) {
    throw new Error('Item não é um certificado válido');
  }
} 