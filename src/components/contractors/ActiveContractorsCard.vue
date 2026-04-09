<template>
  <ProfessionalCard
    :professional="contractor"
    detailsRouteName="details-contractor"
    fallbackMalePhoto="/default-contractor.png"
    fallbackFemalePhoto="/default-contractor.png"
    cardClass="active-card"
    nameKey="firstName"
    skillsKey="skills"
    emptyName="Unnamed Contractor"
    emptySkills="No skills listed"
  />
</template>

<script setup>
import ProfessionalCard from "@/components/ProfessionalCard.vue";

defineProps({
  contractor: {
    type: Object,
    required: true
  }
});
</script>