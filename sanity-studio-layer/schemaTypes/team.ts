import { defineField, defineType } from "sanity";

export const team = defineType({
    name: 'team',
    type: 'document',
    title: 'Team',
    fields: [
      defineField({ name: 'name', type: 'string', title: 'Team Name', validation: (rule) => rule.required()}),
      defineField({ name: 'logoUrl', type: 'url', title: 'Team Logo URL'}),
      defineField({ name: 'dateCreated', type: 'datetime', title: 'Date Team Created', initialValue: () => new Date().toISOString(), validation: (rule) => rule.required()}),
      defineField({ name: 'manager', type: 'string', title: 'Manager', validation: (rule) => rule.required()}),
    ],
})


