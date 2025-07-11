exports.up = (pgm) => {
  pgm.createTable("users", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },
    // For reference, Github limits usernames to 39 characters.
    username: {
      type: "varchar(30)",
      notNull: true,
      unique: true,
    },

    // Devido ao informado do máximo no stack overflow
    email: {
      type: "varchar(254)",
      notNull: true,
      unique: true,
    },

    //Why 72 in length https://security.stackexchange.com/q/21524
    password: {
      type: "varchar(72)",
      notNull: true,
    },
    //Why timestamp with timezone: https://justatheory.com/tags/time-zones/#:~:text=Always%20specify%20a%20time%20zone,ZONE%20expression%20in%20your%20query.
    created_at: {
      type: "timestamptz",
      default: pgm.func("now()"),
    },

    updated_at: {
      type: "timestamptz",
      default: pgm.func("now()"),
    },
  });
};

exports.down = false;
