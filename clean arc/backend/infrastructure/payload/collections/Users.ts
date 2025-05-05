import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
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
      options: [{ label: "User", value: "user" }],
      required: true,
      defaultValue: "user",
      hidden: true,
    },
  ],
};
