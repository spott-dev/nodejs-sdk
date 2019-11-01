const sinon = require('sinon');
const searchPlaces = require('../../src/search-places');

const FAKE_RESPONSE = 'RESPONSE';

const getMock = sinon.stub().resolves(FAKE_RESPONSE);
const fetcherMock = { get: getMock };

describe('Spott SDK | .searchPlaces', () => {
  beforeEach(() => {
    getMock.resetHistory();
  });

  it('should request data with correct parameters (no options)', async () => {
    const query = 'Guadalajara';
    const reponse = await searchPlaces(fetcherMock, query);

    expect(reponse).to.be.eql(FAKE_RESPONSE);
    expect(getMock.callCount).to.be.equal(1);

    const [params] = getMock.firstCall.args;
    const expectedQuery = {
      q: query
    };
    expect(params).to.be.an('object');
    expect(params.path).to.be.equal('/places');
    expect(params.query).to.be.eql(expectedQuery);
  });

  it('should request data with correct parameters and options', async () => {
    const query = 'Guadalajara';
    const options = {
      types: ['CITY', 'ADMIN_DIVISION_1', 'COUNTRY'],
      countries: ['CA'],
      adminDivisions1: [],
      adminDivisions2: null,
      latitude: -21.1,
      longitude: 103.5,
      accuracyRadiusKm: 500,
      language: 'fr',
      skip: 10,
      limit: 20,
      foo: 'bar'
    };
    const reponse = await searchPlaces(fetcherMock, query, options);

    expect(reponse).to.be.eql(FAKE_RESPONSE);
    expect(getMock.callCount).to.be.equal(1);

    const [params] = getMock.firstCall.args;
    const expectedQuery = {
      q: query,
      type: 'CITY,ADMIN_DIVISION_1,COUNTRY',
      country: 'CA',
      adminDivision1: '',
      latitude: -21.1,
      longitude: 103.5,
      accuracyRadiusKm: 500,
      language: 'fr',
      skip: 10,
      limit: 20,
      foo: 'bar'
    };
    expect(params).to.be.an('object');
    expect(params.path).to.be.equal('/places');
    expect(params.query).to.be.eql(expectedQuery);
  });

  it('should throw an error when an array property is other type', () => {
    const query = 'Guadalajara';
    const options = {
      types: 'CITY'
    };
    expect(() => searchPlaces(fetcherMock, query, options)).to.throw(Error, 'Expected parameter "types" to be an array');
  });
});
