import { Sheet } from "../models/sheet.js";
import { User } from "../models/user.js";

export const createSheet = async ({
  player_id,
  character: {
    character_name,
    character_class,
    level,
    race,
    background,
    alignment,
    xp,
    personality_trait,
    ideals,
    bonds,
    flaws,
    features_and_traits,
  },
  abilities: {
    strength,
    dexterity,
    constitution,
    intelligence,
    wisdom,
    charisma,
  },
  passive_wisdom,
  inspiration,
  proficiency_bonus,
  saving_throws: {
    saving_strength,
    saving_dexterity,
    saving_constitution,
    saving_intelligence,
    saving_wisdom,
    saving_charisma,
  },
  skills: {
    acrobatics,
    animal_handling,
    arcana,
    athletics,
    deception,
    history,
    insight,
    intimidation,
    investigation,
    medicine,
    nature,
    perception,
    performance,
    persuasion,
    religion,
    sleight_of_hand,
    stealth,
    survival,
  },
  other_proficiencies,
  combat: {
    armor_class,
    initiative,
    speed,
    hp: { max_hp, current_hp, temporary_hp, hp_dice },
    death_saves: { successes, failures },
    attacks_and_spells,
  },
  bag: {
    money: { cp, sp, ep, gp, pp },
    equipment,
  },
}) => {
  const new_sheet = await Sheet.create({
    player_id,
    character: {
      character_name,
      character_class,
      level,
      race,
      background,
      alignment,
      xp,
      personality_trait,
      ideals,
      bonds,
      flaws,
      features_and_traits,
    },
    abilities: {
      strength,
      dexterity,
      constitution,
      intelligence,
      wisdom,
      charisma,
    },
    passive_wisdom,
    inspiration,
    proficiency_bonus,
    saving_throws: {
      saving_strength,
      saving_dexterity,
      saving_constitution,
      saving_intelligence,
      saving_wisdom,
      saving_charisma,
    },
    skills: {
      acrobatics,
      animal_handling,
      arcana,
      athletics,
      deception,
      history,
      insight,
      intimidation,
      investigation,
      medicine,
      nature,
      perception,
      performance,
      persuasion,
      religion,
      sleight_of_hand,
      stealth,
      survival,
    },
    other_proficiencies,
    combat: {
      armor_class,
      initiative,
      speed,
      hp: { max_hp, current_hp, temporary_hp, hp_dice },
      death_saves: { successes, failures },
      attacks_and_spells,
    },
    bag: {
      money: { cp, sp, ep, gp, pp },
      equipment,
    },
  });
  const u = await User.findById(new_sheet.player_id);
  const user_sheets = [...u.sheets, new_sheet];
  await User.findByIdAndUpdate(
    { _id: new_sheet.player_id },
    { sheets: user_sheets },
    { new: true }
  );
  return new_sheet.save();
};

export const getSheets = async () => {
  return await Sheet.find({});
};
