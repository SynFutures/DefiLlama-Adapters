const { sumTokens2 } = require('../helper/unwrapLPs')

async function tvl(_, _b, _cb, { api, }) {
  const farms = await api.call({
    target: '0xC4fb09E0CD212367642974F6bA81D8e23780A659',
    abi: 'function getFarmList() view returns (address[])',
  })
  const rewardTokens = await api.multiCall({
    calls: farms,
    abi: 'function getRewardTokens() view returns (address[])',
  })

  const toa = []
  farms.forEach((o, i) => {
    rewardTokens[i].forEach(t => toa.push([t, o]))
  });
  await sumTokens2({  api, owners: farms, resolveUniV3: true, })
  return sumTokens2({ api, tokensAndOwners: toa, })
}

module.exports = {
  doublecounted: true,
  arbitrum: { tvl }
}