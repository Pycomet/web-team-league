import { defineType, defineField } from "sanity";

export const player = defineType({
    name: 'player',
    type: 'document',
    title: 'Player',
    fields: [
      defineField({ name: 'name', type: 'string', title: 'Player Name', validation: (rule) => rule.required() }),
      defineField({
        name: 'team',
        type: 'reference',
        to: [{ type: 'team' }],
        title: 'Team',
        validation: (rule) => rule.required()
      }),
      defineField({ name: 'position', type: 'string', title: 'Position', validation: (rule) => rule.required()}),
      defineField({ name: 'goals', type: 'number', title: 'Goals Scored', initialValue: () => 0 }),
      defineField({ name: 'assists', type: 'number', title: 'Assists', initialValue: () => 0 }),
      defineField({ name: 'cards', type: 'number', title: 'Yellow or Red Cards', initialValue: () => 0 })
    ],
})