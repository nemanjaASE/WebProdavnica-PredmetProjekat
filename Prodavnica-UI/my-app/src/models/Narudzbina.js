export class NarudzbinaModel {
    constructor(
      Id,
      Komentar,
      Adresa,
      Cena,
      VremePorudzbine,
      VremeDostave,
      Status,
      NarudzbinaProivods,
      CenaDostave,
      Korisnik,
      KorisnikId
    ) {
      this.Id = Id;
      this.Komentar = Komentar;
      this.Adresa = Adresa;
      this.Cena = Cena;
      this.VremePorudzbine = VremePorudzbine;
      this.VremeDostave = VremeDostave;
      this.Status = Status;
      this.NarudzbinaProivods = NarudzbinaProivods;
      this.CenaDostave = CenaDostave;
      this.Korisnik = Korisnik;
      this.KorisnikId = KorisnikId;
    }
  }