import { redirect, type Actions, type ServerLoadEvent } from "@sveltejs/kit";


export const load = async ({ request }: ServerLoadEvent) => {
  if (request.method !== 'POST') throw redirect(303, '/');
};

export const actions: Actions = {
  async default({ request }) {
    const values = await request.formData();
    const labels = {
      x: values.get('x')?.toString() || 'X',
      y: values.get('y')?.toString() || 'Y'
    };
    const report = JSON.parse(values.get('report')!.toString());

    return { labels, report };
  },
};