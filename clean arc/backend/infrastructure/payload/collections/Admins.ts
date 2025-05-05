import type { CollectionConfig } from "payload";

export const Admins: CollectionConfig = {
  slug: "admins",
  admin: {
    useAsTitle: "email",
  },
  auth: true,
  fields: [
    // Email added by default //
    { name: "name", type: "text", required: true },
    {
      name: "role",
      type: "select",
      options: [
        { label: "Root Admin", value: "root-admin" },
        { label: "Admin", value: "admin" },
        { label: "Editor", value: "editor" },
      ],
      defaultValue: "editor",
      required: true,
    },
  ],
};
