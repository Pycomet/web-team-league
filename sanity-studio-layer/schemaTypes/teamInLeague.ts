import { defineField, defineType } from "sanity";

export const teamInLeague = defineType({
    name: 'teamInLeague',
    type: 'document',
    title: 'Team in League',
    fields: [
      defineField({
        name: 'team',
        type: 'reference',
        to: [{ type: 'team' }],
        title: 'Team',
        validation: (rule) => rule.required() 
      }),
      defineField({
        name: 'league',
        type: 'reference',
        to: [{ type: 'league' }],
        title: 'League',
        validation: (rule) => rule.required() 
      }),
      defineField({ name: 'points', type: 'number', title: 'Points', initialValue: () => 0 }),
      defineField({ name: 'matches', type: 'number', title: 'Matches Played', initialValue: () => 0 }),
      defineField({ name: 'wins', type: 'number', title: 'Wins', initialValue: () => 0 }),
      defineField({ name: 'losses', type: 'number', title: 'Losses', initialValue: () => 0 }),
      defineField({ name: 'draws', type: 'number', title: 'Draws', initialValue: () => 0 }),
      defineField({ name: 'goalDifference', type: 'number', title: 'Goal Difference', initialValue: () => 0 }),
      defineField({ name: 'isQualified', type: 'boolean', title: 'Team Qualified In Current Stage', initialValue: () => true }),
    ],
})