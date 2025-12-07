const knex = require('knex')(require('./knexfile').development);

async function runCRUD() {
  // Insert
  await knex('users').insert({
    full_name: 'Farman Ali',
    email: 'farman@example.com'
  });
  console.log('Inserted user Farman Ali');

  // Select
  const users = await knex('users').select('*');
  console.log('All users:', users);

  // Update
  await knex('users')
    .where({ id: 1 })
    .update({ full_name: 'New Name' });
  console.log('Updated user with id 1');

  // Delete
  await knex('users')
    .where({ id: 1 })
    .del();
  console.log('Deleted user with id 1');

  // Close connection
  await knex.destroy();
}

runCRUD().catch(console.error);
