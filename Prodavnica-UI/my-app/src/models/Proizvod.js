export class ProizvodModel {
    constructor(
      Id,
      Email,
      Naziv,
      Cena,
      Kolicina,
      Opis,
      Slika,
      NarudzbinaProivods,
      Obrisan,
      Korisnik,
      KorisnikId
    ) {
      this.Id = Id;
      this.Email = Email;
      this.Naziv = Naziv;
      this.Cena = Cena;
      this.Kolicina = Kolicina;
      this.Opis = Opis;
      this.Slika = Slika;
      this.NarudzbinaProivods = NarudzbinaProivods;
      this.Obrisan = Obrisan;
      this.Korisnik = Korisnik;
      this.KorisnikId = KorisnikId;
    }
  }