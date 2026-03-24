import fs from 'fs';
import path from 'path';
import { Client, Product, Order } from '@/types';

const dataDir = path.join(process.cwd(), 'data');

export function readClients(): Client[] {
  const filePath = path.join(dataDir, 'clients.json');
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}

export function writeClients(clients: Client[]): void {
  const filePath = path.join(dataDir, 'clients.json');
  fs.writeFileSync(filePath, JSON.stringify(clients, null, 2));
}

export function readProducts(): Product[] {
  const filePath = path.join(dataDir, 'products.json');
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}

export function writeProducts(products: Product[]): void {
  const filePath = path.join(dataDir, 'products.json');
  fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
}

export function readOrders(): Order[] {
  const filePath = path.join(dataDir, 'orders.json');
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}

export function writeOrders(orders: Order[]): void {
  const filePath = path.join(dataDir, 'orders.json');
  fs.writeFileSync(filePath, JSON.stringify(orders, null, 2));
}
