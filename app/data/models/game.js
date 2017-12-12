'use strict';

import Realm from 'realm';

export default class Game extends Realm.Object {}

Game.schema = {
  name: 'Game',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    users: { type: 'linkingObjects', objectType: 'User', property: 'game' },
    isDone: { type: 'bool', default: false },
    step: { type: 'string', optional: true },
    valueCareers: { type: 'list', objectType: 'arrayString' },
    personalityCareers: { type: 'list', objectType: 'arrayString' },
    recommendation: { type: 'list', objectType: 'Recommendation' },
    goalCareer: 'string',
    reason: 'string',
    personalUnderstandings: { type: 'list', objectType: 'PersonalUnderstanding' },
    gameSubject: { type: 'GameSubject', optional:  true },
  }
}
