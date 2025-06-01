import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { eq, desc, asc, like, and, count, sql } from "drizzle-orm";
import {
  users, posts, categories, comments, downloads, menus,
  type User, type InsertUser,
  type Post, type InsertPost,
  type Category, type InsertCategory,
  type Comment, type InsertComment,
  type Download, type InsertDownload,
  type Menu, type InsertMenu
} from "@shared/schema";

const connection = postgres(process.env.DATABASE_URL!);
const db = drizzle(connection);

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Categories
  getCategories(): Promise<Category[]>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Posts
  getPosts(limit?: number, categoryId?: number): Promise<Post[]>;
  getFeaturedPosts(): Promise<Post[]>;
  getPost(id: number): Promise<Post | undefined>;
  getPostBySlug(slug: string): Promise<Post | undefined>;
  createPost(post: InsertPost): Promise<Post>;
  updatePost(id: number, post: Partial<InsertPost>): Promise<Post | undefined>;
  incrementPostViews(id: number): Promise<void>;
  searchPosts(query: string, categoryId?: number): Promise<Post[]>;
  
  // Comments
  getPostComments(postId: number): Promise<Comment[]>;
  createComment(comment: InsertComment): Promise<Comment>;
  
  // Downloads
  getDownloads(categoryId?: number): Promise<Download[]>;
  getPopularDownloads(): Promise<Download[]>;
  createDownload(download: InsertDownload): Promise<Download>;
  incrementDownloadCount(id: number): Promise<void>;
  
  // Menus
  getMenus(): Promise<Menu[]>;
  createMenu(menu: InsertMenu): Promise<Menu>;
  
  // Statistics
  getStatistics(): Promise<{
    totalPosts: number;
    totalDownloads: number;
    totalUsers: number;
  }>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.email, email));
    return result[0];
  }

  async createUser(user: InsertUser): Promise<User> {
    const result = await db.insert(users).values(user).returning();
    return result[0];
  }

  async getCategories(): Promise<Category[]> {
    return await db.select().from(categories).orderBy(asc(categories.order));
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    const result = await db.insert(categories).values(category).returning();
    return result[0];
  }

  async getPosts(limit = 10, categoryId?: number): Promise<Post[]> {
    if (categoryId) {
      return await db.select().from(posts)
        .where(and(eq(posts.published, true), eq(posts.categoryId, categoryId)))
        .orderBy(desc(posts.createdAt))
        .limit(limit);
    }
    
    return await db.select().from(posts)
      .where(eq(posts.published, true))
      .orderBy(desc(posts.createdAt))
      .limit(limit);
  }

  async getFeaturedPosts(): Promise<Post[]> {
    return await db.select().from(posts)
      .where(and(eq(posts.published, true), eq(posts.featured, true)))
      .orderBy(desc(posts.createdAt))
      .limit(4);
  }

  async getPost(id: number): Promise<Post | undefined> {
    const result = await db.select().from(posts).where(eq(posts.id, id));
    return result[0];
  }

  async getPostBySlug(slug: string): Promise<Post | undefined> {
    const result = await db.select().from(posts).where(eq(posts.slug, slug));
    return result[0];
  }

  async createPost(post: InsertPost): Promise<Post> {
    const result = await db.insert(posts).values(post).returning();
    return result[0];
  }

  async updatePost(id: number, post: Partial<InsertPost>): Promise<Post | undefined> {
    const result = await db.update(posts)
      .set({ ...post, updatedAt: new Date() })
      .where(eq(posts.id, id))
      .returning();
    return result[0];
  }

  async incrementPostViews(id: number): Promise<void> {
    await db.update(posts)
      .set({ views: sql`views + 1` })
      .where(eq(posts.id, id));
  }

  async searchPosts(query: string, categoryId?: number): Promise<Post[]> {
    if (categoryId) {
      return await db.select().from(posts)
        .where(and(
          eq(posts.published, true),
          eq(posts.categoryId, categoryId),
          like(posts.title, `%${query}%`)
        ))
        .orderBy(desc(posts.createdAt));
    }

    return await db.select().from(posts)
      .where(and(
        eq(posts.published, true),
        like(posts.title, `%${query}%`)
      ))
      .orderBy(desc(posts.createdAt));
  }

  async getPostComments(postId: number): Promise<Comment[]> {
    return await db.select().from(comments)
      .where(eq(comments.postId, postId))
      .orderBy(desc(comments.createdAt));
  }

  async createComment(comment: InsertComment): Promise<Comment> {
    const result = await db.insert(comments).values(comment).returning();
    return result[0];
  }

  async getDownloads(categoryId?: number): Promise<Download[]> {
    let query = db.select().from(downloads);
    
    if (categoryId) {
      query = query.where(eq(downloads.categoryId, categoryId));
    }
    
    return await query.orderBy(desc(downloads.createdAt));
  }

  async getPopularDownloads(): Promise<Download[]> {
    return await db.select().from(downloads)
      .orderBy(desc(downloads.downloadCount))
      .limit(6);
  }

  async createDownload(download: InsertDownload): Promise<Download> {
    const result = await db.insert(downloads).values(download).returning();
    return result[0];
  }

  async incrementDownloadCount(id: number): Promise<void> {
    await db.update(downloads)
      .set({ downloadCount: sql`download_count + 1` })
      .where(eq(downloads.id, id));
  }

  async getMenus(): Promise<Menu[]> {
    return await db.select().from(menus)
      .where(eq(menus.visible, true))
      .orderBy(asc(menus.order));
  }

  async createMenu(menu: InsertMenu): Promise<Menu> {
    const result = await db.insert(menus).values(menu).returning();
    return result[0];
  }

  async getStatistics(): Promise<{
    totalPosts: number;
    totalDownloads: number;
    totalUsers: number;
  }> {
    const [postsCount] = await db.select({ count: count() }).from(posts);
    const [downloadsCount] = await db.select({ count: count() }).from(downloads);
    const [usersCount] = await db.select({ count: count() }).from(users);
    
    return {
      totalPosts: postsCount.count,
      totalDownloads: downloadsCount.count,
      totalUsers: usersCount.count,
    };
  }
}

export const storage = new DatabaseStorage();
