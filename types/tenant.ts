export interface TenantContext {
  id: string;
  name: string;
  slug: string;
}

export interface TenantScopedEntity {
  id: string;
  tenantId: TenantContext["id"];
  createdAt: string;
  updatedAt: string;
}
