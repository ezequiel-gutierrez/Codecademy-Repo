// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

// Create factory ⚙🏭⚙

function pAequorFactory(num, arr) {
  return {
    specimenNum: num,
    dna: arr,
    mutate () {
      // Pick the index where the mutation will occur
      let mutatedStrand = Math.floor(Math.random()*this.dna.length);
      // Get a mutation
      let mutation = returnRandBase();
      // If the mutation is the same as the dna original base run the mutation again
      while (mutation === this.dna[mutatedStrand]) {
        mutation = returnRandBase();
      }
      // Change the base for the mutation
      this.dna[mutatedStrand] = mutation;
    },
    compareDNA (obj) {
      // Made variables to easily manage all data 😂
      const thisSpecimen = this.dna;
      const specimenToCompare = obj.dna;
      let dnaSimilarity = 0;
      
      // Iterates trough the full array (of the current specimen)
      for (let i = 0; i < this.dna.length; i++) {
        if (thisSpecimen[i] === specimenToCompare[i]) {
          dnaSimilarity++;
        }
      }
      // Pass the similarity to a percentage
      let dnaSimilarityPercentage = (dnaSimilarity * 100) / thisSpecimen.length;

      // Rounds the percentage to have 2 decimal points only
      let dnaRounded = dnaSimilarityPercentage.toFixed(2);
      
      // Handle both cases when DNA is a percentage and when it is 0
      if (dnaSimilarity === 0) {
        console.log(`Specimen 1# and Specimen 2# doesn't share DNA`);
      } else {
        console.log(`Specimen 1# and Specimen 2# share ${dnaRounded}% DNA in common`);
      }
    },
    willLikelySurvive () {
      const specimenDna = this.dna;
      let survivaviltyChanceArray = specimenDna.filter((element) => element === 'C' || element === 'G');
      let survivalBases = 0;
      const highSurvivalChance = Math.floor((60*specimenDna.length)/100);
      for (bases of survivaviltyChanceArray) {
        survivalBases++;
      }
      if (survivalBases >= highSurvivalChance) {
        return true;
      } else {
        return false
      }
    }
  }
}

let pAequorSamples = [];

for (i = 0; i < 31; i++) {
  pAequorSamples.push(pAequorFactory(i, mockUpStrand()));
}

console.log(pAequorSamples);