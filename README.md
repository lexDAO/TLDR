STEAL THIS C0D3SL4W 

# The lexDAO Registry ✒️ TLDR
> Transactional Scripts for Legal and Ethereal Deal Security

 📖 [Read the Docs](https://lexdao.gitbook.io/tldr/)

![lexDAO Club](.github/images/lexDAOClubLandingPage.png)

🛠️ [Ethereum Mainnet Deployment](https://etherscan.io/address/0x8CEDe32BbbCe5854992e151Fe215f2887E522553) ⚡
[TLDR dApp (WIP)](https://lexdao.club/)

TLDR is an interactive registry and market on Ethereum that allows anyone to select curated legal wrappers or *lexScript* for two main types of transactions also hosted by TLDR programming:

**(1) Digital Retainers (DR) & (2) Digital Covenants (DC)**

From our initial observations, we believe that blockchain-optimized legal transactions primarly fall into these categories and present immediate opportunities for utilizing transactional scripts (or, *smart contracts*) to scope out efficiency gains.

## DR

DRs are essentially Ethereum escrow transactions that support any ERC-20 digital token, where the public can initialize and record unique deal terms for good or services between a designated *client* and *provider* and then have TLDR act as escrow agent and arbiter of their deal, *registered digital retainer*.

Practically, DRs can be one-off transactions triggered by the client or consist of several releases at a *deliverable rate* from escrow over a set duration. Each DR therefore has a *pay cap* that acts as a hard limit for the ERC-20 amount escrowed in TLDR and paid under the deal as well as a *duration* timer that will release the escrow remainder to the paying *client* after termination.

## DC

DCs can be pledges, representations and/or warranties that Ethereum accounts might want to sign and associate around in order to access DAOs or other digital communities with participation rules. DC signatures can be revoked at will by each signatory, and are separately recorded for public inspection as *registered digital convenants*.

## TLDR lexDAO Governance

TLDR lexScript is maintained by lexScribes who admit each other as *lexDAO* participants through a membership DAO and 'agent' program on Aragon that controls the `addScribe` function on TLDR.

In order to boost lexScript contributions and good stewardship of related disputes, TLDR implements a minimal DAO design inspired by Manuel Araoz *[digital violence](https://maraoz.com/2019/02/11/digital-life/)*, wherein, participants police each other's reputation points and can effectively *disbar* or kill off unruly lexScribes from their digital association when such balance hits zero. 

Ether (Ξ) and LEX ERC-20 tokens (minted from TLDR service actions) may also be redeemed for lexDAO reputation points within different periods tracked for each lexDAO participant; "icedown" of 90 days for either committing a LEX burning (10) or Ξ (0.1) to replenish reputation. Ξ submissions are forwarded to the then-current lexDAO vault address.

As noted above, friendly lexScribes can boost each other's reputation to the maximum, 3 ('three strikes you're out') point amount. Reputation boosting and slashing are maintained by a daily 'cooldown' period tracked for each lexScribe account.

### Crypto-Economics 

To incentivize quality contributions to TLDR, each DR that imports a lexScript will pay the requested fee of the author lexScribe. 

For example, a DR with a deliverable rate of "500 DAI" might pay 5 DAI on TLDR escrow transactions to satisfy a "lexRate" of 1%.

lexScribes disbarred from TLDR by lexDAO governance lose access to uploading new lexScript and such earning opportunities. 

### Arbitration

Reputable lexScribes that also hold 5 LEX in their accounts are also able to resolve DR disputes and claim a set 5% arbitration fee of the remaining DR escrow for such TLDR service, offering more opportunities for lexDAO sustainability and reputation value. 

## TLDR Solidity Design

[Base Solidity Contract Review](https://hackmd.io/@9imjf7czSc-9k0W4HcSANw/B1djOpjFS)

[v0.3 Solidity Contract Map](https://etherscan.io/viewsvg?t=1&a=0x8CEDe32BbbCe5854992e151Fe215f2887E522553)

![tldrSolidityMAP](https://storage.googleapis.com/sol2uml-storage/mainnet-0x8cede32bbbce5854992e151fe215f2887e522553.svg)
