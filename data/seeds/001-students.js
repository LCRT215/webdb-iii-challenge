exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("students")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("students").insert([
        { name: "Leslie T", cohorts_id: 1 },
        { name: "Adewale A", cohorts_id: 3 },
        { name: "Sally", cohorts_id: 2 }
      ]);
    });
};
