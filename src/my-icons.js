// http://127.0.0.1:8000/?name=blog-icon&size=24&icon=editor%3Avertical-align-bottom&icon=editor%3Avertical-align-center&icon=editor%3Avertical-align-top&icon=icons%3Aarrow-back&icon=icons%3Acloud-done&icon=icons%3Acreate&icon=icons%3Adrafts&icon=icons%3Aexpand-less&icon=icons%3Amenu
import '@polymer/iron-iconset-svg/iron-iconset-svg.js';
const $_documentContainer = document.createElement('template');
const html = function(strings) {
  return strings.join('');
};
$_documentContainer.innerHTML = html`
<iron-iconset-svg size="24" name="my-icons">
<svg><defs>
<g id="vertical-align-bottom"><path d="M16 13h-3V3h-2v10H8l4 4 4-4zM4 19v2h16v-2H4z"></path></g>
<g id="vertical-align-center"><path d="M8 19h3v4h2v-4h3l-4-4-4 4zm8-14h-3V1h-2v4H8l4 4 4-4zM4 11v2h16v-2H4z"></path></g>
<g id="vertical-align-top"><path d="M8 11h3v10h2V11h3l-4-4-4 4zM4 3v2h16V3H4z"></path></g>
<g id="arrow-back"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path></g>
<g id="cloud-done"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM10 17l-3.5-3.5 1.41-1.41L10 14.17 15.18 9l1.41 1.41L10 17z"></path></g>
<g id="create"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></g>
<g id="drafts"><path d="M21.99 8c0-.72-.37-1.35-.94-1.7L12 1 2.95 6.3C2.38 6.65 2 7.28 2 8v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2l-.01-10zM12 13L3.74 7.84 12 3l8.26 4.84L12 13z"></path></g>
<g id="expand-less"><path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"></path></g>
<g id="menu"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></g>
<g id="social-twitter"><path transform="rotate(-179.85841369628906 12.048535346984863,12.022008895874023) " d="m1.1181,18.75614c0.80433,-0.35431 1.66873,-0.59377 2.57598,-0.70147c-0.92604,0.55135 -1.63715,1.42437 -1.97202,2.46465c0.86655,-0.51053 1.82642,-0.88128 2.84802,-1.08111c0.81817,0.86579 1.98379,1.40682 3.27373,1.40682c2.477,0 4.48516,-1.99454 4.48516,-4.45468c0,-0.34915 -0.03974,-0.68915 -0.11619,-1.01518c3.72749,0.18577 7.03224,1.95928 9.24435,4.65443c0.38607,-0.65794 0.60717,-1.4231 0.60717,-2.23957c0,-1.5455 -0.79178,-2.90903 -1.99522,-3.70786c0.73518,0.02311 1.42673,0.2235 2.03145,0.55716c0.00035,-0.01859 0.0004,-0.03717 0.0004,-0.056c0,-2.1584 -1.54599,-3.9589 -3.59773,-4.36812c0.37635,-0.10179 0.7726,-0.1562 1.18159,-0.1562c0.28902,0 0.56998,0.02786 0.84382,0.07989c-0.57072,-1.76987 -2.22704,-3.05779 -4.18964,-3.09375c1.53496,-1.19476 3.46883,-1.90697 5.57009,-1.90697c0.36202,0 0.71904,0.02104 1.06991,0.06217c-1.98484,-1.26391 -4.34232,-2.00137 -6.87513,-2.00137c-8.24957,0 -12.76072,6.78807 -12.76072,12.67481c0,0.19316 0.00431,0.38528 0.01295,0.5763c-0.87622,0.62808 -1.63666,1.4127 -2.23798,2.30604"/></g>
<g id="social-github"><path d="m12.00007,1.27152c-6.07439,0 -11.00009,4.92479 -11.00009,11.00009c0,4.86012 3.15186,8.98343 7.52253,10.43795c0.54975,0.10182 0.75158,-0.23863 0.75158,-0.52917c0,-0.2623 -0.0102,-1.12882 -0.0149,-2.04799c-3.06023,0.66542 -3.70598,-1.29786 -3.70598,-1.29786c-0.50038,-1.27146 -1.22136,-1.60954 -1.22136,-1.60954c-0.99804,-0.68273 0.0752,-0.6687 0.0752,-0.6687c1.1046,0.0774 1.68623,1.13374 1.68623,1.13374c0.98109,1.68149 2.57333,1.19532 3.20104,0.91425c0.0987,-0.71096 0.3838,-1.19641 0.69839,-1.47092c-2.44327,-0.27815 -5.01168,-1.22136 -5.01168,-5.43629c0,-1.20096 0.42971,-2.18223 1.13338,-2.95258c-0.11421,-0.27724 -0.49073,-1.39586 0.10656,-2.91105c0,0 0.92372,-0.29564 3.02581,1.12756c0.87745,-0.24373 1.81847,-0.36596 2.7533,-0.37015c0.93483,0.004 1.87658,0.12642 2.75567,0.37015c2.09954,-1.4232 3.02198,-1.12756 3.02198,-1.12756c0.59875,1.51519 0.22205,2.63381 0.10784,2.91105c0.70531,0.77035 1.1321,1.75162 1.1321,2.95258c0,4.22495 -2.57333,5.15522 -5.02279,5.42755c0.39455,0.34136 0.74611,1.01079 0.74611,2.03706c0,1.47183 -0.0127,2.65639 -0.0127,3.0187c0,0.29273 0.198,0.63573 0.75558,0.52771c4.36831,-1.45616 7.51616,-5.57801 7.51616,-10.43649c-0.00001,-6.0753 -4.92498,-11.00009 -10.99991,-11.00009"></path></g>
<g id="social-medium"><path d="m 24.000046,3.536683 h -0.949222 c -0.352406,0 -0.850786,0.642447 -0.850786,1.053204 v 14.900581 c 0,0.411049 0.498371,0.972459 0.850786,0.972459 h 0.949222 V 24 h -8.599969 v -3.536878 h 1.8 V 4.799805 h -0.08826 L 12.908484,24 H 9.6542333 L 5.5050458,4.799805 h -0.105 v 15.663317 h 1.8 V 24 H 4.5715387e-5 V 20.463122 H 0.92207705 c 0.37959375,0 0.87796865,-0.561409 0.87796865,-0.972459 V 4.589984 c 0,-0.411049 -0.4983753,-1.053204 -0.87796865,-1.053204 H 4.5715387e-5 V 0 H 9.0032333 l 2.9559377,13.894732 h 0.08153 L 15.023765,0 h 8.976281 v 3.536878"/></g>
</defs></svg>
</iron-iconset-svg>`;

document.head.appendChild($_documentContainer.content);
