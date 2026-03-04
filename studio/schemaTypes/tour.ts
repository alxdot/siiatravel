import {defineField, defineType} from 'sanity'

export const tour = defineType({
  name: 'tour',
  title: 'Tour',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
    }),

    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {hotspot: true},
    }),

    defineField({
      name: 'priceFromEur',
      title: 'Price From (EUR)',
      type: 'number',
    }),

    defineField({
      name: 'durationHours',
      title: 'Duration (hours)',
      type: 'number',
    }),

    defineField({
      name: 'format',
      title: 'Format',
      type: 'string',
      options: {
        list: [
          {title: 'Walking', value: 'walking'},
          {title: 'With car', value: 'car'},
          {title: 'Mixed', value: 'mixed'},
        ],
      },
    }),

    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],

  preview: {
    select: {
      title: 'title',
      media: 'heroImage',
      subtitle: 'format',
    },
  },
})
