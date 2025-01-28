import { defineField, defineType } from "sanity";

export const league = defineType({
    name: 'league',
    type: 'document',
    title: 'League',
    fields: [
      defineField({ name: 'name', type: 'string', title: 'League Name', validation: (rule) => rule.required() }),
      defineField({ name: 'startDate', type: 'datetime', title: 'Start Date', validation: (rule) => rule.required() }),
      defineField({ name: 'endDate', type: 'datetime', title: 'End Date' }),
      defineField({ name: 'totalTeams', type: 'number', title: 'Total Teams', validation: (rule) => rule.required() }),
      defineField({
        name: 'stage',
        type: 'string',
        title: 'Status',
        options: {
          list: ['Group', 'Knockout', 'Semi-final', 'Final'],
        },
        initialValue: () => 'Group'
      }),
    ],
  })