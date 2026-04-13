export type ToolCategory =
  | 'image'
  | 'document'
  | 'video'
  | 'audio'
  | 'compression'
  | 'dev';

export interface Tool {
  id: string;
  name: string;
  nameZh: string;
  description: string;
  descriptionZh: string;
  category: ToolCategory;
  tags: string[];
  tagsZh: string[];
  url: string;
  favicon: string;
  isPopular: boolean;
}

export interface Category {
  id: ToolCategory | 'all';
  name: string;
  nameZh: string;
  icon: string;
}
