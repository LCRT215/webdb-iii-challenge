exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("students")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("students").insert([
        { name: "Leslie T", cohort_id: 1 },
        { name: "Adewale A", cohort_id: 3 },
        { name: "Sally", cohort_id: 2 }
      ]);
    });
};
