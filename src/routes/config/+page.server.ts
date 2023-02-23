import { redirect, type ServerLoadEvent } from '@sveltejs/kit'
import type { Actions } from './$types';
import xlsx from 'xlsx';
import csv from 'csvtojson';


export const load = ({ request }: ServerLoadEvent) => {
  if (!request.body) {
    throw redirect(303, '/');
  }
};

export const actions: Actions = {
  async default({ request }) {
    const values = await request.formData();
    const file = values.get('import') as File;

    switch (file.type) {
      case 'text/csv':
      case 'csv':
        return await parseCSV(file);
      default:
        return await parseExcel(file);
    }
  },
};

const parseCSV = async (file: File) => {
  const dataString = await file.text();
  const json = await csv({ output: 'json', noheader: false, headers: ['x', 'y'] }).fromString(dataString) as Record<string, number>[];
  return json;
};

const parseExcel = async (file: File) => {
  const fileJSON = xlsx.read(await file.arrayBuffer(), { type: 'binary' });
  const firstSheet = fileJSON.Sheets[fileJSON.SheetNames[0]];
  return xlsx.utils.sheet_to_json<Record<string, number>>(firstSheet, { header: ['x', 'y'] });
};