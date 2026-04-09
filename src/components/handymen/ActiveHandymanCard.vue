<template>
  <ProfessionalCard
    :professional="handyman"
    detailsRouteName="details-handyman"
    fallbackMalePhoto="/default-handyman-male.png"
    fallbackFemalePhoto="/default-handyman-female.png"
    cardClass="active-card"
    nameKey="firstName"
    skillsKey="skills"
    emptyName="Unnamed Handyman"
    emptySkills="No skills listed"
  />
</template>

<script setup>
import ProfessionalCard from "@/components/ProfessionalCard.vue";

defineProps({
  handyman: {
    type: Object,
    required: true
  }
});
</script>