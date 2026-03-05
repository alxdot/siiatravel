import {defineField, defineType} from 'sanity'

export const review = defineType({
  name: 'review',
  title: 'Review',
  type: 'document',
  description: 'Global company review with moderation status.',

  initialValue: {
    status: 'pending',
    date: new Date().toISOString(),
    subjectType: 'company',
  },

  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Reviewer display name.',
      validation: (Rule) => Rule.required().min(2),
    }),

    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      description: 'Integer rating from 1 to 5.',
      validation: (Rule) => Rule.required().integer().min(1).max(5),
    }),

    defineField({
      name: 'text',
      title: 'Text',
      type: 'text',
      rows: 4,
      description: 'Review content shown on the site.',
      validation: (Rule) => Rule.required().min(10),
    }),

    defineField({
      name: 'subjectType',
      title: 'Review subject',
      type: 'string',
      options: {
        layout: 'radio',
        list: [
          {title: 'Company', value: 'company'},
          {title: 'Tour', value: 'tour'},
          {title: 'Service', value: 'service'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'tour',
      title: 'Tour',
      type: 'reference',
      to: [{type: 'tour'}],
      hidden: ({document}) => document?.subjectType !== 'tour',
    }),

    defineField({
      name: 'service',
      title: 'Service',
      type: 'string',
      options: {
        list: [
          {title: 'Yacht', value: 'yacht'},
          {title: 'Transfer', value: 'transfer'},
          {title: 'Guide', value: 'guide'},
          {title: 'Interpreter', value: 'interpreter'},
          {title: 'Helicopter', value: 'helicopter'},
          {title: 'Shopping', value: 'shopping'},
          {title: 'Other', value: 'other'},
        ],
      },
      hidden: ({document}) => document?.subjectType !== 'service',
    }),

    // ✅ Only ONE "date" field
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      readOnly: true,
      description: 'Submission date/time (auto-filled).',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      initialValue: 'pending',
      description: 'Moderation status for publication.',
      options: {
        list: [
          {title: 'Pending', value: 'pending'},
          {title: 'Approved', value: 'approved'},
          {title: 'Rejected', value: 'rejected'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {
      title: 'name',
      rating: 'rating',
      status: 'status',
    },
    prepare(selection) {
      const {title, rating, status} = selection as {
        title?: string
        rating?: number
        status?: string
      }

      return {
        title: title ?? 'Unnamed review',
        subtitle: `${rating ?? '-'}★ • ${status ?? 'pending'}`,
      }
    },
  },
})
