# Calendar AVZ

This project is a 1-day challenge for an assessment with Avizio.

<details>
<summary>Instructions (translated from French)</summary>

> **Objective:**
> To create a web page for booking a Zoom call (https://zoom.us/).
>
> **Details:**
> The page should display a calendar week, and allow the user to book a meeting by drag & drop (Google Calendar interface type). When the user has chosen a slot in this way, a window appears displaying the date, the selected start and end times, an "Object" field and two buttons (validate and cancel).
> If the user validates, a Zoom call should be created on the chosen slot, and a confirmation displayed to the user.
>
> **Constraints:**
> Javascript technologies React.js and Node.js will be used for this exercise.
> The time required for this exercise is approximately 2 hours.
>
> **Additional instructions:**
> The candidate will create a Zoom account dedicated to this exercise and provide access to the expert.
> The candidate will create a github repository(s) to host his code, and commit it regularly to keep track of progress.
>
> Items to be supplied to the expert at the same time as the case is submitted:
>
> - Zoom login to access the account
> - Links to github repository(ies)
> - Any additional instructions the candidate deems necessary to show the expert how to test the code.

</details>

## Requirements

- Node.js 18.x
- pnpm (see [installation instructions](https://pnpm.io/fr/installation))

## Start the project locally

1. Create a [Zoom Server-to-Server OAuth application](https://developers.zoom.us/docs/internal-apps/s2s-oauth/)
2. Install the dependencies with pnpm
3. Fill the .env.development file with the Zoom application credentials

To start the local server, run :

```shell
pnpm dev
```

Website will be available at http://localhost:3000

## Stack

## General

- Mostly written in [TypeScript](https://www.typescriptlang.org/) v5.1
- [Next.js v13 (app directory)](https://nextjs.org/docs/app) as fullstack React framework

### Libraries

- [Tailwind CSS](https://tailwindcss.com/) for easy and consistent styling
- [date-fns](https://date-fns.org) for date manipulations
- [React DnD](https://react-dnd.github.io/react-dnd/) from drag-n-drop primitives
- [React Query](https://tanstack.com/query/latest/docs/react/overview) for API intreactions
- [Zod](https://zod.dev/) for data validation

### CI

- [Website](https://avz.bour.tech) is hosted on [Vercel](https://vercel.com)
- TypeScript code is linted with [ESLint](https://eslint.org/)
- Code is formatted using [Prettier](https://prettier.io/)
- Git hooks are handled with [Lefthook](https://github.com/evilmartians/lefthook)
- Automatic quality assessment is run on [GitHub Actions](https://github.com/features/actions)
