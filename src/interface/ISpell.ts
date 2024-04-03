interface ISpell {
  id: number,
  name: string,
  nameEN: string,
  level: number,
  school: string,
  castTime: string,
  distance: string,
  verbal: boolean,
  somatic: boolean,
  material: boolean,
  component: string,
  duration: string,
  classes: string,
  archetypes: string,
  ritual: boolean,
  concentration: boolean,
  source: Array<any>,
  descriprion: Array<any>,
  levelUp: string
}

export default ISpell;