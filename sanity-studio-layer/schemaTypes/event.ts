import { defineField, defineType } from "sanity";

export const event = defineType({
    name: 'event',
    type: 'document',
    title: 'Event',
    fields: [
      defineField({
        name: 'fixture',
        type: 'reference',
        to: [{ type: 'fixture' }],
        title: 'Fixture',
        validation: (rule) => rule.required() 
      }),
      defineField({
        name: 'team',
        type: 'reference',
        to: [{ type: 'team' }],
        title: 'Team',
        validation: (rule) => rule.required() 
      }),
      defineField({
        name: 'player',
        type: 'reference',
        to: [{ type: 'player' }],
        title: 'Player (Optional)',
      }),
      defineField({
        name: 'eventType',
        type: 'string',
        title: 'Event Type',
        options: {
          list: [
            'Goal',
            'Yellow Card',
            'Red Card',
            'Half-Time',
            'Full-Time',
          ],
        },
        validation: (rule) => rule.required() 
      }),
      defineField({ name: 'eventTime', type: 'datetime', title: 'Event Time (Minute)', initialValue: () => new Date().toISOString() })
    ],
  })