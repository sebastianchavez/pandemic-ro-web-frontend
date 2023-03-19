import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'job'
})
export class JobPipe implements PipeTransform {

  transform(job: number) {
    return this.searchJob(job);
  }

  searchJob(job: number) {
    let jobs:
    { class: number; job: string; }[] = [
    { class: 0, job: 'Novice' },
    { class: 1, job: 'Swordman' },
    { class: 2, job: 'Magician' },
    { class: 3, job: 'Archer' },
    { class: 4, job: 'Acolyte' },
    { class: 5, job: 'Merchant' },
    { class: 6, job: 'Thief' },
    { class: 7, job: 'Knight' },
    { class: 8, job: 'Priest' },
    { class: 9, job: 'Wizard' },
    { class: 10, job: 'Blacksmith' },
    { class: 11, job: 'Hunter' },
    { class: 12, job: 'Assassin' },
    { class: 14, job: 'Crusader' },
    { class: 15, job: 'Monk' },
    { class: 16, job: 'Sage' },
    { class: 17, job: 'Rogue' },
    { class: 18, job: 'Alchemist' },
    { class: 19, job: 'Bard' },
    { class: 20, job: 'Dancer' },
    { class: 4001, job: 'Novice High' },
    { class: 4002, job: 'Swordman High' },
    { class: 4003, job: 'Magician High' },
    { class: 4004, job: 'Archer High' },
    { class: 4005, job: 'Acolyte High' },
    { class: 4006, job: 'Merchant High' },
    { class: 4007, job: 'Thief High' },
    { class: 4008, job: 'Lord Knight' },
    { class: 4009, job: 'High Priest' },
    { class: 4010, job: 'High Wizard' },
    { class: 4011, job: 'Whitesmith' },
    { class: 4012, job: 'Sniper' },
    { class: 4013, job: 'Assassin Cross' },
    { class: 4015, job: 'Paladin' },
    { class: 4016, job: 'Champion' },
    { class: 4017, job: 'Professor' },
    { class: 4018, job: 'Stalker' },
    { class: 4019, job: 'Creator' },
    { class: 4020, job: 'Clown' },
    { class: 4021, job: 'Gypsy' },
    { class: 23, job: 'Super Novice' },
    { class: 24, job: 'Gunslinger' },
    { class: 25, job: 'Ninja' },
    { class: 4045, job: 'Super Baby' },
    { class: 4046, job: 'Taekwon' },
    { class: 4047, job: 'Star Gladiator' },
    { class: 4049, job: 'Soul Linker' },
    { class: 4023, job: 'Baby Novice' },
    { class: 4024, job: 'Baby Swordman' },
    { class: 4025, job: 'Baby Magician' },
    { class: 4026, job: 'Baby Archer' },
    { class: 4027, job: 'Baby Acolyte' },
    { class: 4028, job: 'Baby Merchant' },
    { class: 4029, job: 'Baby Thief' },
    { class: 4030, job: 'Baby Knight' },
    { class: 4031, job: 'Baby Priest' },
    { class: 4032, job: 'Baby Wizard' },
    { class: 4033, job: 'Baby Blacksmith' },
    { class: 4034, job: 'Baby Hunter' },
    { class: 4035, job: 'Baby Assassin' },
    { class: 4037, job: 'Baby Crusader' },
    { class: 4038, job: 'Baby Monk' },
    { class: 4039, job: 'Baby Sage' },
    { class: 4040, job: 'Baby Rogue' },
    { class: 4041, job: 'Baby Alchemist' },
    { class: 4042, job: 'Baby Bard' },
    { class: 4043, job: 'Baby Dancer' },
    ]

    return jobs.find(x => x.class == job)?.job || job.toString()
  }
}


