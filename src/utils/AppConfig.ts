type AppConfigType = {
  locale: string;
  site_name: string;
  title: string;
  description: string;
}

export const AppConfig: AppConfigType = {
  site_name: 'Blog',
  title: 'Nextjs Starter',
  description: 'Starter code for your Nextjs Boilerplate with Tailwind CSS',
  locale: 'en',
};