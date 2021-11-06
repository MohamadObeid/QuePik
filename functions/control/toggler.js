module.exports = ({ VALUE, params = {}, id }) => {
  const controls = params.controls;

  return [{
    event: `click??value.view::${controls.id}!=${controls.view}`,
    actions: [
      `setStyle::${controls.id}?value.element.style.transition::${controls.id}=transform .2s, opacity .2s;style.transform=translateY(-150%);style.opacity=0`,
      `setStyle>>400::${controls.id}?style.transform=translateY(0);style.opacity=1`,
      `createView>>250::${controls.id}?value.element.innerHTML::${controls.id}='';value.Data::${controls.id}=value.data();view=${controls.view}`,
    ]
  }]
}
