import Nat "mo:core/Nat";
import Float "mo:core/Float";
import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";

actor {
  type Domain = {
    id : Nat;
    name : Text;
    price : Float;
    registrar : Text;
    atomLink : Text;
    afternicLink : Text;
    spaceshipLink : Text;
  };

  module Domain {
    public func compare(domain1 : Domain, domain2 : Domain) : Order.Order {
      Nat.compare(domain1.id, domain2.id);
    };
  };

  type Offer = {
    domainId : Nat;
    amount : Float;
    email : Text;
    timestamp : Int;
  };

  module Offer {
    public func compare(offer1 : Offer, offer2 : Offer) : Order.Order {
      Nat.compare(offer1.domainId, offer2.domainId);
    };
  };

  type ContactMessage = {
    domainId : Nat;
    name : Text;
    email : Text;
    message : Text;
    timestamp : Int;
  };

  module ContactMessage {
    public func compare(message1 : ContactMessage, message2 : ContactMessage) : Order.Order {
      Nat.compare(message1.domainId, message2.domainId);
    };
  };

  let domainStore = Map.empty<Nat, Domain>();
  let offerStore = Map.empty<Nat, Offer>();
  let contactMessageStore = Map.empty<Nat, ContactMessage>();

  var nextOfferId = 0;
  var nextContactMessageId = 0;

  public shared ({ caller }) func initStore() : async () {
    if (domainStore.isEmpty()) {
      let data = [
        // id, name, price, registrar, atomLink, afternicLink, spaceshipLink
        (1, "MarketMain.com", 2500.0, "GoDaddy", "", "", ""),
        (2, "LayerClaw.com", 1800.0, "Namecheap", "", "", ""),
        (3, "ClawPro.ai", 4500.0, "Spaceship", "", "", ""),
        (4, "InstaPro.ai", 3800.0, "Afternic", "", "", ""),
        (5, "WareLLM.com", 5200.0, "GoDaddy", "", "", ""),
        (6, "TechnoASI.com", 2900.0, "Namecheap", "", "", ""),
        (7, "COACloud.com", 3100.0, "GoDaddy", "", "", ""),
        (8, "Sevotel.com", 1500.0, "Namecheap", "", "", ""),
        (9, "KongCrypto.com", 4200.0, "GoDaddy", "", "", ""),
      ];

      for ((id, name, price, registrar, atomLink, afternicLink, spaceshipLink) in data.values()) {
        let domain : Domain = {
          id;
          name;
          price;
          registrar;
          atomLink;
          afternicLink;
          spaceshipLink;
        };
        domainStore.add(id, domain);
      };
    };
  };

  public query ({ caller }) func getDomains() : async [Domain] {
    domainStore.values().toArray().sort();
  };

  public query ({ caller }) func getDomainById(id : Nat) : async ?Domain {
    domainStore.get(id);
  };

  public shared ({ caller }) func submitOffer(domainId : Nat, amount : Float, email : Text) : async Bool {
    let offer : Offer = {
      domainId;
      amount;
      email;
      timestamp = Time.now();
    };

    offerStore.add(nextOfferId, offer);
    nextOfferId += 1;

    true;
  };

  public shared ({ caller }) func contactSeller(domainId : Nat, name : Text, email : Text, message : Text) : async Bool {
    let contactMessage : ContactMessage = {
      domainId;
      name;
      email;
      message;
      timestamp = Time.now();
    };

    contactMessageStore.add(nextContactMessageId, contactMessage);
    nextContactMessageId += 1;

    true;
  };

  public query ({ caller }) func getOffers() : async [Offer] {
    offerStore.values().toArray().sort();
  };

  public query ({ caller }) func getContactMessages() : async [ContactMessage] {
    contactMessageStore.values().toArray().sort();
  };
};
