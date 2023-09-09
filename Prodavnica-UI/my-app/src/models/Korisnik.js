export class RegistracijaModel {
    constructor(
      Id,
      KorisnickoIme,
      Email,
      Sifra,
      PonovljenaSifra,
      Ime,
      Prezime,
      DatumRodjenja,
      Adresa,
      Slika,
      Tip
    ) 
    {
      this.Id = Id;
      this.KorisnickoIme = KorisnickoIme;
      this.Email = Email;
      this.Sifra = Sifra;
      this.PonovljenaSifra = PonovljenaSifra;
      this.Ime = Ime;
      this.Prezime = Prezime;
      this.DatumRodjenja = DatumRodjenja;
      this.Adresa = Adresa;
      this.Slika = Slika;
      this.Tip = Tip;
    }
  }