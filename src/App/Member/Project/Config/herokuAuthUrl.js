const base = 'https://id.heroku.com/oauth/authorize';
const id = '32931eff-467a-4ec4-819a-d8d2e93dae88';
const state = 'TK-TK-TK'; // TEMP, of course
const query = `client_id=${id}&response_type=code&scope=read&state=${state}`;
const url = `${base}?${query}`;

export default () => url;
