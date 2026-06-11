<template>
  <div>
  
  admin dashboards
  
  </div>
</template>

<script>



export default {
  name: "FirstDash",

  computed: {
    role() {
      try {
        const roles = JSON.parse(localStorage.getItem("roles") || "[]");
        const names = roles.map(r => (r.name || r).toLowerCase());
        if (names.includes("admin"))        return "admin";
        if (names.includes("organization")) return "organization";
        if (names.includes("tester"))       return "tester";
      } catch (_) {}

      // fallback to single role string
      const role = (localStorage.getItem("role") || "").toLowerCase();
      if (role === "admin")        return "admin";
      if (role === "organization") return "organization";
      return "tester";
    },
  },
};
</script>
