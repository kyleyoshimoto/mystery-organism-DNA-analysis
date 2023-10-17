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

// Returns an object with a the properties specimenNum and dna and the method mutate().
function pAequorFactory(specimenNum, dna) {
  return {
    specimenNum: specimenNum,
    dna: dna,
    // Randomly replaces one of the bases of the dna sequence with a random other base.
    mutate() {
      const randBaseIndex = Math.floor(Math.random() * (dna.length - 1));
      for (i = 1; i != 0;) {
      let replacement = returnRandBase();
      if (dna[randBaseIndex] != replacement) {
        dna[randBaseIndex] = replacement;
        i = 0;
        };
      };
    },
    // calculates what percentage of DNA bases do two different P. Aequor have in common.
    compareDNA(diffPAequor) {
      sameSum = 0;
      for (i in this.dna) {
        if (this.dna[i] === diffPAequor.dna[i]) {
          sameSum += 1;
        }
      };
      const samePercentage = (sameSum / this.dna.length) * 100;
      return `Specimen #${this.specimenNum} and specimen #${diffPAequor.specimenNum} have ${samePercentage}% DNA in common.`
    },
    // Calculates what percentage of DNA is made up of 'C' or 'G' bases.
    willLikelySurvive(dna = this.dna) {
      let CorG = 0;
      for (i in dna) {
        if (dna[i] === 'C' || dna[i] === 'G') {
          CorG += 1;
        };
      };
      return ((CorG / dna.length) >= 0.6);
    }
  };
};

// Testing to see that the P. Aequor Factory and the mutate method work.
const pAequor1 = pAequorFactory(1, mockUpStrand());
console.log("Mutation demo:")
console.log(pAequor1.dna);
pAequor1.mutate();
console.log(pAequor1.dna);
console.log("\n"); 

// Testing to see that the compareDNA method work.
console.log("Compare DNA Demo:\nP. Aequor #1 DNA strand:");
console.log(pAequor1.dna);
const pAequor2 = pAequorFactory(2, mockUpStrand());
console.log("P. Aqueor #2 DNA strand:");
console.log(pAequor2.dna);
console.log(pAequor1.compareDNA(pAequor2));

// Function that creates an array of specimen of size specified upon calling.
function podOfPAequor(size) {
  pod = [];
  for (i = 0; i < size; i++) {
    pod.push(pAequorFactory(i, mockUpStrand()));
  };
  return pod;
}

// Testing podOfPAequor function.
const pod1 = podOfPAequor(30);
console.log('Pod #1 of 30 P. Aequor:')
console.log(pod1);

// Function that will see what percent of a pod is likely to survive.
function podLikelyToSurvive(pod) {
  likelySum = 0;
  for (i in pod) {
    if (pod[i].willLikelySurvive()) {
      likelySum++;
    };
  };
  const likelyPercentage = (likelySum / pod.length) * 100;
  return `This pod of ${pod.length} P. Aequor has a ${likelyPercentage}% of organisms that are likely to survive based on their DNA.`
}

// Testing podLikelyToSurvive function.
console.log(podLikelyToSurvive(pod1));