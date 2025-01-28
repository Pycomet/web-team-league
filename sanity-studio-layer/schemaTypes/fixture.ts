import { defineField, defineType } from "sanity";

export const fixture = defineType({
    name: 'fixture',
    type: 'document',
    title: 'Fixture',
    fields: [
      defineField({
        name: 'league',
        type: 'reference',
        to: [{ type: 'league' }],
        title: 'League',
        validation: (rule) => rule.required() 
      }),
      defineField({
        name: 'homeTeam',
        type: 'reference',
        to: [{ type: 'team' }],
        title: 'Home Team',
        validation: (rule) => rule.required() 
      }),
      defineField({
        name: 'awayTeam',
        type: 'reference',
        to: [{ type: 'team' }],
        title: 'Away Team',
        validation: (rule) => rule.required() 
      }),
      defineField({ name: 'matchDate', type: 'datetime', title: 'Match Date', validation: (rule) => rule.required() }),
      defineField({
        name: 'status',
        type: 'string',
        title: 'Status',
        options: {
          list: ['Scheduled', 'Live', 'Completed', 'Cancelled'],
        },
        initialValue: () => "Scheduled"
      }),
      defineField({ name: 'homeScore', type: 'number', title: 'Home Score', initialValue: () => 0 }),
      defineField({ name: 'awayScore', type: 'number', title: 'Away Score', initialValue: () => 0 }),
    ],
  })