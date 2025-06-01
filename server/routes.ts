import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPostSchema, insertCommentSchema, insertDownloadSchema, insertCategorySchema, insertMenuSchema, insertUserSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Categories routes
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ message: "Erro ao buscar categorias" });
    }
  });

  app.post("/api/categories", async (req, res) => {
    try {
      const category = insertCategorySchema.parse(req.body);
      const newCategory = await storage.createCategory(category);
      res.status(201).json(newCategory);
    } catch (error) {
      console.error("Error creating category:", error);
      res.status(400).json({ message: "Erro ao criar categoria" });
    }
  });

  // Posts routes
  app.get("/api/posts", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const categoryId = req.query.categoryId ? parseInt(req.query.categoryId as string) : undefined;
      const posts = await storage.getPosts(limit, categoryId);
      res.json(posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).json({ message: "Erro ao buscar posts" });
    }
  });

  app.get("/api/posts/featured", async (req, res) => {
    try {
      const posts = await storage.getFeaturedPosts();
      res.json(posts);
    } catch (error) {
      console.error("Error fetching featured posts:", error);
      res.status(500).json({ message: "Erro ao buscar posts em destaque" });
    }
  });

  app.get("/api/posts/search", async (req, res) => {
    try {
      const query = req.query.q as string;
      const categoryId = req.query.categoryId ? parseInt(req.query.categoryId as string) : undefined;
      
      if (!query) {
        return res.status(400).json({ message: "Query de busca é obrigatória" });
      }
      
      const posts = await storage.searchPosts(query, categoryId);
      res.json(posts);
    } catch (error) {
      console.error("Error searching posts:", error);
      res.status(500).json({ message: "Erro ao buscar posts" });
    }
  });

  app.get("/api/posts/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const post = await storage.getPostBySlug(slug);
      
      if (!post) {
        return res.status(404).json({ message: "Post não encontrado" });
      }
      
      // Increment views
      await storage.incrementPostViews(post.id);
      
      res.json(post);
    } catch (error) {
      console.error("Error fetching post:", error);
      res.status(500).json({ message: "Erro ao buscar post" });
    }
  });

  app.post("/api/posts", async (req, res) => {
    try {
      const post = insertPostSchema.parse(req.body);
      const newPost = await storage.createPost(post);
      res.status(201).json(newPost);
    } catch (error) {
      console.error("Error creating post:", error);
      res.status(400).json({ message: "Erro ao criar post" });
    }
  });

  // Comments routes
  app.get("/api/posts/:postId/comments", async (req, res) => {
    try {
      const postId = parseInt(req.params.postId);
      const comments = await storage.getPostComments(postId);
      res.json(comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
      res.status(500).json({ message: "Erro ao buscar comentários" });
    }
  });

  app.post("/api/posts/:postId/comments", async (req, res) => {
    try {
      const postId = parseInt(req.params.postId);
      const commentData = insertCommentSchema.parse({
        ...req.body,
        postId
      });
      const comment = await storage.createComment(commentData);
      res.status(201).json(comment);
    } catch (error) {
      console.error("Error creating comment:", error);
      res.status(400).json({ message: "Erro ao criar comentário" });
    }
  });

  // Downloads routes
  app.get("/api/downloads", async (req, res) => {
    try {
      const categoryId = req.query.categoryId ? parseInt(req.query.categoryId as string) : undefined;
      const downloads = await storage.getDownloads(categoryId);
      res.json(downloads);
    } catch (error) {
      console.error("Error fetching downloads:", error);
      res.status(500).json({ message: "Erro ao buscar downloads" });
    }
  });

  app.get("/api/downloads/popular", async (req, res) => {
    try {
      const downloads = await storage.getPopularDownloads();
      res.json(downloads);
    } catch (error) {
      console.error("Error fetching popular downloads:", error);
      res.status(500).json({ message: "Erro ao buscar downloads populares" });
    }
  });

  app.post("/api/downloads", async (req, res) => {
    try {
      const download = insertDownloadSchema.parse(req.body);
      const newDownload = await storage.createDownload(download);
      res.status(201).json(newDownload);
    } catch (error) {
      console.error("Error creating download:", error);
      res.status(400).json({ message: "Erro ao criar download" });
    }
  });

  app.post("/api/downloads/:id/increment", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.incrementDownloadCount(id);
      res.json({ message: "Download count incremented" });
    } catch (error) {
      console.error("Error incrementing download count:", error);
      res.status(500).json({ message: "Erro ao incrementar contador de download" });
    }
  });

  // Menus routes
  app.get("/api/menus", async (req, res) => {
    try {
      const menus = await storage.getMenus();
      res.json(menus);
    } catch (error) {
      console.error("Error fetching menus:", error);
      res.status(500).json({ message: "Erro ao buscar menus" });
    }
  });

  app.post("/api/menus", async (req, res) => {
    try {
      const menu = insertMenuSchema.parse(req.body);
      const newMenu = await storage.createMenu(menu);
      res.status(201).json(newMenu);
    } catch (error) {
      console.error("Error creating menu:", error);
      res.status(400).json({ message: "Erro ao criar menu" });
    }
  });

  // Statistics route
  app.get("/api/statistics", async (req, res) => {
    try {
      const stats = await storage.getStatistics();
      res.json(stats);
    } catch (error) {
      console.error("Error fetching statistics:", error);
      res.status(500).json({ message: "Erro ao buscar estatísticas" });
    }
  });

  // Authentication routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ message: "Usuário já existe com este email" });
      }

      const existingUsername = await storage.getUserByUsername(userData.username);
      if (existingUsername) {
        return res.status(400).json({ message: "Nome de usuário já está em uso" });
      }

      const user = await storage.createUser(userData);
      
      // Remove password from response
      const { password, ...userWithoutPassword } = user;
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ message: "Erro ao criar usuário" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ message: "Email e senha são obrigatórios" });
      }

      const user = await storage.getUserByEmail(email);
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Credenciais inválidas" });
      }

      // Remove password from response
      const { password: _, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ message: "Erro ao fazer login" });
    }
  });

  app.get("/api/auth/me", async (req, res) => {
    try {
      const userId = req.headers['user-id'];
      if (!userId) {
        return res.status(401).json({ message: "Não autenticado" });
      }

      const user = await storage.getUser(Number(userId));
      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      // Remove password from response
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Erro ao buscar usuário" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
