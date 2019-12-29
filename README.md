STEAL THIS C0D3SL4W 

# The lexDAO Registry ✒️ TLDR
> Transactional Scripts for Legal and Ethereal Deal Security

![lexDAO Club](.github/images/lexDAOClubLandingPage.png)

🛠️ [Ethereum Mainnet Deployment](https://etherscan.io/address/0x8CEDe32BbbCe5854992e151Fe215f2887E522553) ⚡
[lexDAO dApp (WIP)](https://youthful-cori-55b0b3.netlify.com/)

TLDR is an interactive registry and market on Ethereum that allows anyone to select curated legal wrappers or *lexScript* for two main types of transactions also hosted by TLDR programming:

**(1) Digital Dollar Retainers (DDR) & (2) Digital Covenants (DC)**

From our initial observations, we believe that blockchain-enabled deals primarly fall into these categories and present immediate opportunities for utilizing transactional scripts (or, *smart contracts*) to scope out efficiency gains.

## DDR

DDRs are essentially Ethereum escrow transactions that support any ERC-20 digital token, where the public can initialize and record unique deal terms for good or services between a designated *client* and *provider* and then have the TLDR act as escrow agent and arbiter of their deal, *registered digital dollar retainer*.

Practically, DDRs can be one-off transactions triggered by the client or consist of several releases at a *deliverable rate* from escrow over a set duration. Each DDR therefore has a *pay cap* that acts as a hard limit for the ERC-20 *digital dollar* amount escrowed in TLDR and paid under the deal as well as a *duration* timer that will release the escrow remainder to the paying *client* after termination.

**DDR REGISTRATION:**

![registration](https://pbs.twimg.com/media/EG8p09EWkAEIhab?format=png&name=900x900)

**REGISTERED DDR (RRDR, '1'):**

![rddr1](https://pbs.twimg.com/media/EG8skrqWsAESiQ3?format=png&name=900x900)

**IMPORTED LEXSCRIPT WRAPPER FOR RDDR (LEXID, '1'):**

![lexScript](https://pbs.twimg.com/media/EG8p09EW4AAJT2-?format=png&name=900x900)

**RDDR FEE (LEXID 1 = 1%) PAID TO LEXSCRIBE:**

![lexFee](https://pbs.twimg.com/media/EG8skrrWoAAnlC8?format=png&name=900x900)

## DC

DCs can be pledges, representations and/or warranties that Ethereum accounts might want to sign and associate around in order to access DAOs or other digital communities with participation rules. DC signatures can be revoked at will by each signatory, and are separately recorded for public inspection as *registered digital convenants*.

**DC Signature:**

![dcSig](https://pbs.twimg.com/media/EG8muZeWoAAzYxl?format=png&name=240x240)

**REGISTERED DIGITAL COVENANT:**

![rdc](https://pbs.twimg.com/media/EG8nc2mWkAAbb_k?format=png&name=900x900)

## TLDR lexDAO Governance

TLDR lexScript is maintained by lexScribes who admit each other as *lexDAO* participants through a membership DAO and 'agent' program on Aragon that controls the addScribe function on TLDR.

In order to boost lexScript contributions and good stewardship of related disputes, TLDR implements a minimal DAO design inspired by Manuel Araoz *[digital violence](https://maraoz.com/2019/02/11/digital-life/)*, wherein, participants police each other's reputation points and can effectively *disbar* or kill off unruly lexScribes from their digital association when such balance hits zero.

Ether (Ξ) and LEX ERC-20 tokens (minted from TLDR service actions) may be staked for lexDAO reputation points within different periods tracked for each lexDAO participant; "cooldown" of 1 day for LEX burning (5 LEX for 1 reputation point), and "icedown" of 90 days for staking Ξ to replenish reputation. 

As noted above, friendly lexScribes can boost each other's reputation to the maximum, 3 ('three strikes you're out') point amount. Reputation boosting and slashing are maintained by cooldowns.

Staked Ξ is forwarded to the standing lexDAO address, which can be changed by a fully reputable (3) lexScribe as allowed by their programmed icedown period.

### Crypto-Economics 

To incentivize quality contributions to TLDR, each DDR that imports a lexScript will pay the requested fee of the author lexScribe. 

For example, a DDR with a deliverable rate of "500 DAI" might pay 5 DAI on TLDR transactions to satisfy a "lexRate" of 1% ("100" as set within script).

lexScribes disbarred from TLDR by lexDAO governance lose access to uploading new lexScript and such earning opportunities. 

### Arbitration

Reputable lexScribes within lexDAO are also able to resolve DDR disputes and claim a set 5% arbitration fee of the remaining DDR escrow for such TLDR service, offering more opportunities for lexDAO sustainability and reputation value. 

**RESOLVED RDDR DISPUTE:**

![arb](https://pbs.twimg.com/media/EG8skrsWwAEy-Ct?format=png&name=900x900)

## TLDR Solidity Design

[v0.1 Contract Review](https://hackmd.io/@9imjf7czSc-9k0W4HcSANw/B1djOpjFS)

[v0.2 Solidity Map](https://etherscan.io/viewsvg?t=1&a=0x77eca7e76fbeb9c33d3ef0664f2b333205d48a77)

![tldrSolidityMAP](https://storage.googleapis.com/sol2uml-storage/mainnet-0x77eca7e76fbeb9c33d3ef0664f2b333205d48a77.svg)
