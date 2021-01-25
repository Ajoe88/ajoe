# Migration `20210122031325-initial-version`

This migration has been generated by sfliu at 1/22/2021, 11:13:25 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "User" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "firstName" TEXT,
    "id" TEXT NOT NULL,
    "lastName" TEXT,
    "password" TEXT NOT NULL,
    "roles" TEXT[],
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "username" TEXT NOT NULL,

    PRIMARY KEY ("id")
)

CREATE TABLE "Article" (
    "Authors" TEXT,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" TEXT NOT NULL,
    "Title" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
)

CREATE UNIQUE INDEX "User.username_unique" ON "User"("username")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20210122031325-initial-version
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,28 @@
+datasource postgres {
+  provider = "postgresql"
+  url = "***"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model User {
+  createdAt DateTime @default(now())
+  firstName String?
+  id        String   @id @default(cuid())
+  lastName  String?
+  password  String
+  roles     String[]
+  updatedAt DateTime @updatedAt
+  username  String   @unique
+}
+
+model Article {
+  Authors   String?
+  content   String
+  createdAt DateTime @default(now())
+  id        String   @id @default(cuid())
+  Title     String
+  updatedAt DateTime @updatedAt
+}
```

