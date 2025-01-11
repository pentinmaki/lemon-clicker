const getPurchasableItems = (items) => {
    // Taulukko, johon ostettavissa olevat tuotteet kootaan.
    let purchasableitems = [];
    // Lähtökohtaisesti kaikkia ostettvia tuotteita ei ole listattu.
    let allItemsListed = false;
    // Käydään tuotteet yksitellen lävitse.
    items.forEach(item => {
      // Tarkista, onko ostettavat tuotteet listattu.
      if (!allItemsListed) {
        // Ei ole, lisätään tuote listaan.  
        purchasableitems.push(item);
        // Jos tuotteen määrä on nolla, niin ei listata enempää tuotteita. 
        if (item.qty == 0) {
          allItemsListed = true;
        }
      }
    });
    // Palautetaan koostettu taulukko.
    return purchasableitems;
  }
  
  export default getPurchasableItems;
  