var fhir = require('../../../lib');
var expect = require('chai').expect;

describe('resources.Person', function () {

    var schema = fhir.schema.Person;
    var data;

    beforeEach(function(){
        data = {
            resourceType: 'Person',
            id: '123456',
            meta: {
                versionId: '1',
                lastUpdated: '2015-04-01T12:30:12.000Z',
                profile: [
                    'http://foo.bar/Person'
                ]
            },
            implicitRules: 'http://foo.bar/rules',
            language: 'en-GB',
            text: {
                status: 'generated',
                div: '<p>John J. Doe (2010-04-01)</p>'
            },
            active: true,
            link: [{
                target: {
                    reference: 'Patient/234'
                },
                assurance: 'level2'
            }]
        };
    });

    it('validates a Person', function () {
        var result = fhir.validator.validate(data, schema);

        if (!result.valid){
            console.log(result);
        }

        expect(result.valid).to.be.true;
    });

    it('rejects a Person with invalid id (confirms inheritance from Resource)', function () {
        data.id = '$%^&';

        var result = fhir.validator.validate(data, schema);

        expect(result.valid).to.be.false;
    });
});