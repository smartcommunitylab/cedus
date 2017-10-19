var map,infoWindow,mapPointer,userlocation;
var globalCurrentMarkers = [];
//var allGeoData_pro="gn}zG{ldgA`EmF~H?bDEnGd@tFfAtGd@vEDlGkArB}ApGsEjFaEjBqAjB_@`H|FbFxK~K~CzO`N~BxVjEpObSpE|O}@`NMtAlC|HfElEz@xGn@zC|BhD|DpBx@jEsAzSqHvDyDbCg@fBn@`B{BxBwHbA{Dv@qI]oHS}DVsC|AcGrBkGJ}Fu@aGs@}GWyFAoCb@uCXoGoA_NCoH_AsMaA}QpAgGpEkOrBiLSqJFoM{@cNUeG`B_GfA_G`BwEz@uDj@yWlAaGa@wKBuMZiHd@uJTcHxEaQxJ}JnHqHnEuFhHeKrCkNhBuBtUIbRwFvQnHdGnAvHw@fTsFhUcF~QHpFnWxIlU`MjQbNvZtFtWFdi@}C`Oe@hVSpX@tNvq@zRlSlFxFnKfCsCxHxRdFrHdOvHhD?xGsHrC}CrIePrG^~KhKzGvDrEvBxHdDdH|HzCtE~F`A|Dc@|NzDtHxCjDk@jFr@rBxArGhAlGV~I`FhEx@lEkFrDkC~GyHjCxDfEnBjBvA`DrD|ElBxNmCdCe@dDM`A@rDoAlCmBjFaAnEF`HDxEkDdGUjDS~BoCcAxCo@zHw@fH}GnM_FtGqCfGsEpFoCrEwC|BcCdBoE~CkD`CkCpBuD`Ae@fGd@tBZpD\\jBz@pCnCdElFrDbHdCpDJpGoCbJXfCpFd@bCmEhCoEzB`BvAvBxBrI~G|Gn\\fAtKZxFK`JyB`F}DxEeChIwB`GKnFXbJbDdDhD]vDfDzG~FcE`_@xCpHfEbLhKvObKbM~CtDpE}DjF{EzFyEpC}AvEsB`EoCnFgCxBaA`CwDbBoKCoSlCwRhGgKnDiLxC{KnBkHvA}LvB}FhDmHvHzAvHa@tIZ~KkEhHZf@?f@?f@A`CAlB{MrCcZe@gMnBqHjJ}LnEwRvAiPpBkOjBmMdAaLvAoIdBkC\\e@Zg@xBuB|DfBjGiBpI?rDiBlFCzHrDhGcD|DoFhBd@fEdIvHyIpFyC|FsE`HwLvAgJPaGxFgD~FvDzEzEbDzJ`GlDhFfAzDdFbB~HbDpBxClAnDcAtArAjD|DpE|ElFb@dFgAzCfC`If@`GZxEpBz@|@|HvJbIiAxGiF`@W`@[b@[`@Yb@[b@[b@Y`@[b@[b@Y`@[b@[b@[b@Y`@[fHqJdEyFtJkD|FoDtBuApKkH~GiIuAiOYk@Wk@wDqHHqLz@cQH}MdAoPXqKCkLsCsHZcU}CgGoF}ImFkKgC_MaDkN}AoOoEsNyC{MoBuPBuLvEcDhL{FbHaDfIw@|JdApM`@zLn@hKnAbFvH`HzCnMeD~KwInQkQjKaNbDaGd@iFsC{LkJ}P{GeEsBeD}AkMnAoFtDiJzDyRrFkKxCqEjFsKbDsIpFuMbDeIMyKaAgNiBmShJtFdJhGfMxIxKpQ~HdSnHlCbOjFrI`HbFpDjKbF~JvFfNrGnMi@~L}XtAwE{By@~AgGvCeMlGkDrB_EnDaIvCkFbEyCfEgDhFm@hGyAfIgBlIqAhDiDhEsEtDwCvFsI|BwHpJ`@xBoGtDoHfC{DrHqK}@aDe@sDbBsDjAwEmBiFqAsDh@_C{@{H_@cLn@qIBsE?iJ`AaFB}EHiEnA{CBsF_AyBo@iAsBiGI{D|EbBjHu@zFbBrFNzD[vEVbCiAjC~A~B_EjCQlHx@tDvAxEhDz@rCnFrFfCpCZjEbCfRbAhKlGvOlOqBjWqF`^dB_ClVoElRqIld@}FnLmAxPjNj\\nJaFhRhClQhPrL~QdLnJjl@rKzNeH|IyB|Onh@`Ef@rF|D|GnErEbFjAdHdCjAj@~B|@dHdBbEh@zE|CjCpCrJ|CtCxE}@lH}S~FtCtH`JvJ~VtJnGvMvA|HrGnNdM~FzN|CxJrCvI~FjPFhSaBvRZzKtGbJGb[bDvZzFbZhD~V~CvNw@vV^bQhEv[hB`Zf@rXnGxUtInFzBnYc@pLuAhQ^rK~HrN`JhGnJrDtAdNqBr_@iFfGKxJp@~DRlFKlE\\nJOrGHjFfAdFAr]bAdQ`@`LIjFDnJG|J_AdLsExLaGnEsB|BkCvBlDDvIlGhM~NpWna@bKl]yDjSgP~JoTzJ}KnEzAjFjAjHGbK}@bRyAbGCfKtCnOj@lFCdI|AnDv@hHgA`HY|B`@hBR~CTbId@zGLdFr@fLV~EErBYlAu@tJjApH|HvLlT|Yh]b\\tMxRaBxF_CbDs@bG{BdFiD|GaD|Fw@dI}@nIA`DNxIVrF~@xBtBlH|EfHvEzErI|EjFVpBe@jCXlD\\xBe@bD{@hCo@jDs@`DLlAwAfHuCtDoElBtCdBdIjAbB`EMvA@fA}BxBoAnAgEfCDhAd@zBg@xAd@|@\dA_BjBa@dDgB`COvEaDzCmFbDWzAJpD`E|CPzEeDlD}A~CsGdBiCz@eDXsDl@_Dt@yCWkCEkDjA{CrByC|AsBtCeBfEiAxDwBdDsCbCoCbEuA|A{E_@mHLqDfCmCvEYtDWnAdAbDg@hAGtB`CfBO~EkBtDv@bCm@`@gDpDeExBx@zBjLb@xHd@lGa@|Da@zFJ|GHbHHrGt@hHPxGiAtBPrFdAfEV`KC|IMjIwA`CgBvEy@fFwAlCjDdJ~K`KjIlPdExNbEnHzDjH|BdE~CKhBxAlAJxDoCr@sAhCkCzAqEtB_A|Ay@~BkBZ{BzB}DbFuAxDcIPuD~AoEHkFS{At@}Eh@}Fe@uFxAeDrJrC`GfLrInOrB|EhDrF|A`DjC~A|DnC`CvErCnElBdGbBpKvCiDtFgNlCuGxBqKhIpIvKoR|McChHiD~EsEjGzArHtA_CaL~NmLb\\_YlEqFxAwB`IyC~GqAfD{C~EsEjTnT~I~KxR|@tDcG~WtP~NmKlJ{FdMf@pBbTrAxErNb]nI|e@yCn`@`@de@yB~]jBtXfEn_@xKxi@co@bh@sL~{@hN|]}@~i@qObeAgD~dAmeCh_@wjApZ`D~OaGvLYvH~FrIe@~O_GlIK`LoCdFyCvIwExLgGjLyB~De@fFrCjE?`FmC~Lb@|K?dl@_D|PjBpP~BxTo@vZVlQxDdUtFvPmFz^mG`CrFvTCb]|AbXfCdYnCjMxEtDv@fCwB|HvGl@~KtHzFpIxIvC~FdFbGh@|Eha@~@xl@zHpPrFdGfGfS`MtDnFfPdDxEjClFpL~E~HdH|C~QlF|JlD`@j@nDhDbIaE|[iAxK|@rM~@~Gr@z@FnBpAhGeA~LEjFzBhNb@`RZzMiAlGuDdItFnL{@vFOxLmFtLc@hLvA~KOlH?pDhEhGDtH|B`NkAvPEjMe@tHaDvHoAdIuB`PQvKwBbSu@rK}C|Kd@~IlA|KxDtEvSr@d]`BhK_@tLyCdMcDhGkG`DcCxJrChFuB~Fw@jEf@pKeI`KQvKcInEcLfEmEvHsBtD`B|Gv@tJl@zPz@dHnBqBbMkAjKtBjQxB|MZ`L?`OwAjVcBnNqBjOvAZbI_@bIsCrDmHdAFxAbAbBD`Ga@rBTfC}@bCOvCdEjAbApCpArE`AfC@~CHpDlBx@f@bBxBbB`@bA?v@CxA[tDoA~CsBpEhWrDhPnIr\\hL~CpLaIvL_KrNkCzGC~HfEhAvMy@lJ}IhE{ApDcBrE]bC~A`DgEpIkAjHiEdDuC{BeC~C}BhDkC`B[lDiCzG`ApCfBzCqAnD~@zETfJyBzHZlHiGrBcB`H{KxKoAvMeNdOgIbFqGjIiFPiDcByBr@`CjMnCnOnDxJjCvFuIvGmJhGkNlDkOfAkEuA}CVV|DpEjHrKyA~JdBhKuBtIsDfLmFbMkDbP{CdSkBy@fHdBjEgC~EsAzIwEpM`AxKbEjBnCvHjChFnA~IApMrAlHyDbEcF|V_@fQkCrEUzK`AnPtDjApGwAfAfFqBxLwBpLaDbOgA`J}B|DwA`CcBtCx@jCvDoDdCeFhCmI`Fl@tEx@dKp@rEL|JjBbIFfKUjK~@bIzCrCnN~DdNbKhXvDnHpQmLrRqMbPeG~T_@|OhB{@xOwGrV`EdZ`HdKrGfL|DjJfBlG~GjF|Cz@?_HNeO|IkD|CaFgEiMgAoFhdCvj@hOdWxOb\\jHrFSp]`ArFxGfG`XdHtItAxOqIdI|CxJtCxN_CjMx^xHn]vFpN|@nMbAzHpSfZfFYdEDEvCvG]bKvA`D`I~@~NBfIxKrH~GtFbMcApMaFrHzA|KnAjKoB~F{DFgQi@qPrFuIlD_BrBm@x@`@xAnChChEtGhHfGtPbIaCtQ_KlIkIvKaKlQy[tCrBzAbGvGxQq@r[t@dTaDhNyI`NeDvHmErN}IlNyA|Jf@pHpDhKnBnAdGmCbK}CzKyBpDaIrQoEzFw@hJqCbK_B~KxB|GeArEHxGmCnDw@dFFfK@hMpHdHdDtJdApPxBjMbDrJfDfIoA`O_E|G?nCaBbFv@rIUnHsBlI{FfLvRjLjFpFbHfEbI`MdSfIzOrNz]tHjZlG~KlF~CfHTjDnEfClPrNrVjMbLpIjQ|HrKzY|FfN`D|NfCvGaCtHuIvGdMdPxWhG~Th@fIdFrJdFfNqCaAkIkAsMUsDrDiEvLcA|P}AfNBjJpH`Z}A`EcAnK_@rOxBtMtGxEzEhIEbH^jLyB~CiJbGcDrKaAbI}B|DuExB`A~EwDpHeLvQ}EjKqI`OhBjNqAtFoO|O}E|HeE~IuCjMcM`EyCzHoIxJsGtHeHfDeGpB{AfCYxDfB|A|BbBxFbQjWzWjNvNhSdYuCvOKjL[tJnDnMjDrQ`DvIuArRgBdUcCzSf@vFyIr@_NnBcO|@kFcEiR}E_Mh@RpFz@|ZtSmAvJzC`HrJnJxV_ArJfNtKpFb]cEfJbCfMtGwC|I_EtDeN`PaFbYdNvCn[vHvLhSyGvOpa@hFjPpKdZtKpa@dJvOzBnDoT_@}\wHmc@mX{G_DgHbIgLb@qI`ClU~Q|L|ElIrHzHfHzHr@bN`AvH`JhGbKjC|l@IvR`GjLtPlMfKKlKtFlEgBlOxN{@z[mFfQiQd\\FbSqLzVgCxTkMjFaHnJuDrHsPhPgGhDyMeD}KoRcT}n@wE_G_GuAoDbIuAnNDdNyAt@k@v@mAjCoAzCuKkBp@vFrFbHqRx[sLlf@yFba@}OfZeStYuDfTwD`Sw@b[o@v[nIvD}A~UkDnd@gBhR{@h\\Irl@kHh[yPgCeOKmKsKiJsHuMgDmQgBgJyBiGcQgSwH{ImDaFeNwA{]ei@cFoHs@mF{@cLaB_F\\yNqB{J`@qDeBmEkCuD}A{GkDQaNiD_e@mVtAaRqKbB{N~@sNaGuGuPcFsL|AkL|JwCfKcBbCgFQyGjGaG~CmDNqDtEcErBL~Ph@nE}KqAeTeDiLaAgEqHaHNoCaCeGkBaNLqF{BqImN_D_FiJuMaS_ZyN|IaHtSwS`Uyt@~gCe`@taBqGrWoLrf@mDlOqDtN~@nQvBpS~DjKtC`JaDzReAtVnExPjCtKa@jLgEpNkC~IjBxJjElIzD`IhAtF}BhJaAfEmAfCgDAiCvNYhQgGvAiJtCyGlLiGz@m@xD{AdBEpBCnKjCh^dEvP|CbO`HlKlFvFnEfDnAjAtABjANhAkArCkBbBfF~@zD`CvBzChBpDKhDnArB`CmCrD}B~Ae@nCwAjB}ChA_CRaBr@uAbF{FdD}Dy@kB~CoAvDq@xB}BbKiDzMuEeCiBtHk@|HW|EvBnKiBtAaAxEuDhEkAbHZ|Yt@jE`BxJ}@pKzDzSrJdK|NnTNnMxAlPXfLcNhVyBdHyJxPb@t^dR|VrBnGpFxQvNvXpKjd@|BjWaDlOcBnPUrKbCfVz@lPeEjZMpOxGwApFeCnGi@hGjDhHuG`EqD|K{ErDpKdIvMnK~MrDwAzFnArI{@jg@fObUbRhFjHnDpLuChGcKfL}FhIyAbWhB|{@{@`]zDdg@bHnMxAjIInN`A|Mj@|LjGtEfHhF`DpIlB~Pt@nPtD~NpGnP`ErGbCzF|ApD|QfEpIDxBtId@dLdDjItC|D`C`N`BjPvApRdEjM`BjOaAjGa@pL`BpY?tSaC`IPxDe@xHBdDkBfQ{@zKYnO_FrMqHfPuQcMa@gK{EnDkI~HsGrQcCrHyAaAoDaBeJoHsCoBsAiBWcBmAuCoDqA}AvEcC?aGZuCvB~B`L`AvLyApKeDjCkB@{JiJcIkIHcLyCqZ{JwIaFgG{D}N{H_IcHsAeKdK_CtE{EzDaHdPwA|C{AdEyAvJmBdG_FbHqAnCmC~CMpEi@tDGzD?jFsAhDRlDjBrGn@pEi@`Er@tDWlCn@`HRbDFtG\\fCvAlAvAfA\\jD|@jD|AtDn@tDf@bDy@zCgCvAkD~A_BtBcFpDkChA}BdBmErGsCtDgFlAiDZoAUgBMyB?wCeAcCSiBm@uBe@_As@mAm@k@oB_AqEwFgFiC{AqAmAoBuAoB{@iAnAiCxAoAxAcFzCkGjEkAg@kDa@cFlAeBk@cCw@eApC{C_@mBmAiBgDaAUmAkB}@EqAb@}@\iJnAyAfBmCrC}@rBkAtDqAbBaBRgA|@y@LcAn@aARcAj@aAo@uAVkCRiAScBF_CmAkAa@a@mAy@A{AR_BFy@c@_BXqBbA_CxAeBGeFPu@QeACqAQyBaAmBPuAk@aAW{CRgBD}AgAqAQoAk@s@u@iBw@mDoBkDn@qDdB_DfDcEdGu@nHYvE`AlC}DrDqEnLoIdIgDvLiM|D_KOwKwDyEoIiE_H{E{FwFcGoFlLiItJcFlCsEeGkEw@eEcC`AsIn@{QiDuQmGqKiGkKcDk@eD}EuE}@yGr@sGxDmGi@qJmB_KeFmE_HmFsEmFrCwKxAaJbC}Gj@{F^wGpFiDzLiHjNiAbIgFbLsGhUwGfLaItKyCcAiGkA{IAaNk@mNtCwAlM{@xJ}CpHeIfE_JMaKt@iGnDq[mBaHkE{JiEaHwCeEkHoGsE_EiA}I~DgIt@_[aA{E|@zB`L~AfKtBlUDdLyFzTsF`Nt@lLxBpOsBfK{J`MiMf`AwFfDcF~@wEp@eDUwJBoHkAuL]iHs@mJVeG{@kE_HmImFwDeAgLiEgP{BqCRuCl@yCMsDDsFfBcHmBaLnAqLmAgGeFaIsKsEeDuGwDsGsHuCeCgDgF}AcF{IsMiF_Km@kEt@mT]cK`@wLKuL_EkGgLmFkEY_Eq@{JgDmGuAgIbDcJi@gK|@qGnAwDUyD}@sEdBoL`N{Cu@cIgDoGeGaLrAeMxFuCpRqCpLeLqK_PmDsGoJYeFoCaEuDyKoHeJgIiAoQeBsHeG}E{J_EeIqDwH[qJiGiJ}EgHSmKyD{SkD_JmGeGqJqK}C_GyDgNgDsHuBsBgFT{FgEeJcDwB}BeDuAmLiDiBuH{BsJsI_JmEsEwDsHkGaFwB}CaEmJ{DwLiGkIeL_MaJuJgH_GmJi@oIaC{Dj@eJ{JgMoJ{Gw@cD_AwF_FkG{GaGo@sD|@sJ}E_JEoCq@aFiCwEh@aGxD}FCkHc@uFxAsHr@{Hk@kGgCiMaAeCzEkG~JcG|EeIV}IY}FmBiCaIgCqPsG{MiKuByE{AcFJoMeBuDiAoFqHmOFyG{GoHyIsEOaFeF_EoNaEqFqAVsf@|]cZbT{PjPaXrd@aX|h@_Ji@gD_J}PuI{NqRiVaAkJuCkQu@oIwFaSeYwAyIaHwJgBmMuLyG{LsI_KoF}GwPoD{JiEaBmKKqF_A_K~@yG|HaH@{LzF{I{DcHoH{FwNc@aNsEiQqM}TqTgB{FsSiQmAwOdHeH~AgNbC_JbB{Ex@cIfCkVhIeUjIqJlEwJdDoP^iLhAeFtCaBjLfBpNuGtMaF|GwHxJ{EfLmEjJyGhEyDmDgFyH{GmCmI_EeAqIyCeQkJ_B}FmJwHgPyHsJuDeJeG_LsBYmDxDyNpBeNpKyI|IwCbQoNvMgKjOoJzJgVf@}Q~ByKwFcMcAwJhBwGbWyEvLkDrMiEhKwBtFcMrXyDdJuAlQoCnMwM~^mAjIeEjMqCjKqFbPmChDqEhXBbSPdUgHlCsJ}@cIkGqDsCkHgBqDy@aJFyG]kC]cDgFW}Ka@oQcBsUz@iIn@iL~FeFrDeAPeMO{Gs@sF{CcJgA{B{CcGcBeA}FOgFo@_IdIsEzDeHdAoC{@oGuIaC_DE}JkAgJwAoFEoGAaEs@mF}@aD_CaDmE_CyAqCmCgDsEsEiByBcAuDaAyIuBiCaIyD}BqCeAqKcDmFqDgDy@uDxCqOhBkFzA{Kd@sPaBkKeCqEaDkOfAq[bAic@}@uIXoYwCkKkEwFYce@wLoGmGm@eRdF}AeC_EyNqBoN{CwPmP}@_EiCiCeF_HyKwBoDaNiFwEmQmAsDcG_CsAyHw@qJiCgJqHrPiGjAkJaD_HoBn@pKk@dLg@vHeC~@oFnAaJfEqIrH}B~DiA|Fy@fF_BfA}Jt@_AqAyAqCqDaB_KpCaIpCaH\\iKh@gLlDgHl@{D_CqBqB_F]oCuAaDaDmCkBuEeAmDXeEdBwDjCsDz@{Dh@}DvAiDpBoGv@uDe@yCkDeFmGmCaEwCkEeCoDHeFpAiJr@qFp@sFl@oEv@iAnAmClA}Cz@gB`AsC`AcDrAwCx@kEVeDOcDkAsCw@yAmAaC_B{BkBgCs@oBUmAk@wEmAoGg@oDy@kDAaBq@qCUqA[yGg@kGGiDQ_EgBcFm@_Ca@wEm@aF[sD@cBBqAX}DJ_DQuCmBoFEoG@{Do@_DsCiGeAaC{@sBw@aD}@aM@oHBaGpBwHtBeDpEoKvAaJdAmDv@_CNqDq@eDa@cG}AkDuBuBcDkEgCyEqAmDcCuC}BgKkG{DwC{AUgGeCwH{@eCyBeE{AqAgB_EKeFk@gEKeHH_Kw@oIyB}DyAoGwA_E{BqBkAq@o@yDjBwCl@}Ej@wH@_I_AiMaAaDiFe@aCKsAoBqFmBgAeB{CuAyAs@_C{GqBgG{CkA{A}DaAkBaB{D}@}Fu@cByBsAoA]}Ag@aBgC_DgO{EiJmDqDwAWaDuAoA?oCsC}BsFsCuBcEaHwDeB}DuCiC_JwEoFcFoJmBkG|@}G|C_GNiEeDkHuDgEoAcJh@{Jg@sIoBoGw@_Cn@{@p@gIjAkQE}Fj@wAtA}BjC]nC\|Bi@lBgAn@iA|FoHtFiBnCyBt@iAvAWhGsAvB]dD_EvFuH~GgOzDwJYeD?{DdCkBtBPzDmCvAsBz@g@pCJdCIlD@pCHzC{ApBQfC?rEwFpBu@xFmGxCyClDF`E}AbJwHbFiFhDkD~IYzCcBbFqDzGiHhEkGfJwJvHsFzEuBnGqNfAqJhAuPf@yQgAkLkD}J|@gKZmNtA_On@cJbBkIhB{FvCeLH}P]uKrDoGpAeIzAyHcA_KB}K}AeL]{GVkMl@{Uh@yJnCwL|DgFzAoHr@kNz@{HfAqJeBwGwB}F_BmEcFwGgKcIuGaEgNoHyFse@eAuK_TmJaDw@iB_LjBiJlCyA~JiG|DkDnE_MzEkNv@oMbA_Te@kLEyIv@mFe@oRPgNr@uJXqJcCeKkBqF_GcIeBqCmCqLwBiIsDqGsCqDeAeAiDaFmByMWeHyBO}B{JmB_DcGeGeBb@_Br@wD`CiA`DwETwCMyCaDsDNcDcGgD_KyDsAeH|@oBqAgCgE{B_AmCcAlAcKjBaJXkLsBeGmD}Bm@iAoB{LUkHgAiLkCsGmAmK{BoKsAyB}IkI_G_HwGy@oDuBoE}FwDgBiIgBoC}AsDVeCDDg\\SwJyA{D}DyKuAcJViMQ}FUyB`@uB\\qJXmQmAoLd@eGp@iAvH}FdBkE~@}JXqJhBgExB{FhBoHRaD~@cD|@uCrAeFbAyEnBqHdBqGnCaBvAu@fCgB|DwBpCmAnDiCjCcAlB{@dBsArBiBFeAe@iB@}@HgBHwB^cDVqDhAaCpAqA~As@f@@xAk@|@iAjA}An@}Bx@q@t@}Bt@uA`A_B~@M?kAEcB?uCRsCCaAPiBlA{AbCqExAqBz@kBt@sDbAoDtAaEf@_BhAuD|AsArAgBpCoBtBu@rBOhCWnAk@pBkBlBuAtA_@nBw@~BsBdBiAdBQr@iAx@yBbAq@j@W@eB?mBp@i@z@?f@mAW{AGkBr@qA]qC@yBhBa@rB[zBYrD@xAErB{AfC{@jC[dAsArA{BTkDCiFTqFByEJwCWqAoA{Am@s@kDs@{Cq@sADs@i@i@cBB}@Nm@R}@Lg@XoAp@aAL}@g@iBW_BUoAi@sBSw@HsAX{@Xw@Zy@Vu@jC_LfCkJ|A_L~B}KjB}HfE}AnGuEvC_IfAkFt@{C~@cEnA_GLkB_AaCcAmCi@_CaJkCmKqB}Gx@kFdAiG~BkBn@qBv@_B^aAMuBa@{CUmBI}@EoB?eBbB_@~Bq@hDo@h@wAbAkAjBkArCeBm@kAm@sAk@iBi@gBC_Ap@a@v@cCxAsCd@yATkCBaBAgAr@wAvAo@x@_AdAyE~GgAr@s@PiBZ{En@qG`A}HvAkBJeBc@mBcAiBq@}@`Aq@`BiA\\mBNmIXiDJ_Dz@_MxFoIzCwa@bImH`AaD~Ak@`Hw@vGwCnCsIpGmKtEeIrCqOdEoCn@wAf@eD`A{BjAgBlByBnC{AfAoAp@kB`AiB`AoBPgCNy@Do@DyAP{A^aBnDmBpFq@bCiDlJoBbFeBvE}DxKsEbMuAjDuAbEaCtGk@l@UsB[kDa@aDm@sE[cDi@uFiAaEwAeEeBiFeBgFD_GNiGBiELkKJyIRsEFwDHgDVgFRoIPeCQwDuDcJwA{CmAeA_BeAgCeBqAy@uCaB{Au@eDsBiDoBkBuCwAkB_BqAy@u@a@oAq@iCk@wC_AqDu@uCw@aDaCaEaCgE{BcEaBeCuAkCaAwCuBsEmBiFaC{FeBeDSmAYgGSaCnBwB|A[bBb@~CAx@?|CVvCWfFkE`EiBzAMdCW`D_AhDcAjCcAnCkBxI{AtAl@pAjAjCn@bDYpBLnDg@hA}@tHyHvCyBbDg@jFVtE~A`Dd@vHHbDCbCKlEC|EO~AMjBeB^a@fCwBzDyPdDcO`@aBv@qDz@}ClAsCf@gBtAaElAyDtAqGfAaHvA_BjAs@vAiFk@kFyCyIoCeJCsGpBuAfBUbCo@n@_ALaD@sBt@uBpAkAvB_EjCkBjDw@d@oA`A_Fv@sB`@m@TyCb@cCtAq@@}F~AmCtDkB|AoBpB{@rASzA\\x@o@hAsCtAwDx@[zBeAfB]lBYxAoA`@kCpBiBhAsAdA_B`B[v@q@`@}@m@yBoAeCs@iB_@sBNiCCaCBaCKqB_@qB[mE_@oBsBq@aB_B{AiCc@qB_@yBuA_HsAmGs@oCYuAi@eCSwAYaBV}@~AuE`AmHd@aGQeHm@oC_A_EOkBk@_Fc@cCi@_DwAqBoAaCyAuBi@iEi@cFGkBuAkB_B_AiAUaBu@oBk@yBKqC_AkCqByA{AeAwDuA}@qB_DoAiD}AeDmD_IaEgKf@sJ[oIeAmKiAgFeA}EsA{Di@q@iDkC{BiBeBkAiAo@wB_ByAw@wAeBsBeCmCiCaBoCoHiBwOiEIeCjAwBtAuBxBmDpBkD|@eBrBeArA[nA]~ASbA]|BWn@g@m@{AaAuC|@gA~BkAdACbCPn@?j@qBeAeBuAaAu@a@{Bg@mAg@oAaAv@{D~CgDnA}AtAcBfBsB|@cAhB{@bBu@h@M`BGj@?hAM~A}@n@g@n@kE\\qEPuDj@aDvAyElAaEdAoClAmCdDgG~AeBh@g@lAw@lAw@hBe@zBY`BA`De@`BS~BHhCpAfCr@pEJrFTpE}C~AwBvAm@zAY|Ag@hBs@zEYlCn@HjEvAu@rBsHvDOxCrBhDPzAE{AwFa@{D~CqBxMoJpAk@pKmDhIMvEgBjHcEvCYrEVjC@hCVzDeBhMiBrCp@lBa@|@IbEdAvA|@bClBfBFvAT`Ax@|ArAh@zBElFcBpAsBpBf@dBpBl@ZbCfAYfAXp@lGVfBpAt@~@\`ELpB_@\XU~Cf@lAnA{A~@oC`AcAlBmAjBsA^kATaAf@kBz@kAn@}@|B}DpBkAdC?hCHbEgAhFo@fFk@x@mAdAgAx@_@rBDzAZrDb@tAnCzHMvFtAnDxAhDb@|Ct@xBtA\\pAPrDDp@~@j@v@Ot@IVXNrAZnBDfAKxAr@r@d@t@l@~BfAh@|AaB|CoC~@~AdA`DKvAwBhFCdAx@pAf@j@pBN|BCpAe@`@AbARvElCKhDTlCTj@t@ChAa@p@mAPmAj@_A|@qApBqFt@mAjAiAjDeB\\c@CeAh@_A|BiDf@QvA_@nB_BdBc@jDNx@TbA|@j@`AdDjDzBjBvAf@tAr@J\?dDWzC~@i@~BwC|AwApAoAdA_@zB?rAExA]jAy@hCkC`DaDzDmD~DyDpEeEjFgEnBl@lBVtDs@pBCtB\\nBl@tCbBxAz@bAPv@b@l@j@|@EhACdBIdBi@nAk@t@Wz@]~AuAhAc@`BX^l@CrCA|At@zA`Ap@|AJdCElBCnBNpBD~@f@`Ar@dA`@`ArA]dBe@xBK|A`@h@zAz@zDa@`HoBbCQfApBj@dB`@rBn@tB~@hDx@`AvADjB[vF{@lA\\vAfAjAIjAW~Cq@hE}@`Cc@jAUj@bALnKLzIzAEnCGvAEvAAzB@dAX|Av@jBdA`B~@zAt@xBjAdCnA|BbBdBtBbAlAt@|@vAJ~BaBrCgCpAiBx@cEx@cE~@aDz@yBnB}BhB_@|A_@d@Fr@fBhAvCpAhDt@fBt@pBv@hCZpCf@pFHvEX~DWnAkAxFTpDLbF|@pBf@v@lAh@rBTp@XhBn@lAGhAZpAl@rAKb@\`BV|@VxBr@`Cy@x@A|AkDh@eCzAmBxDBlBbE`BL|AKlBm@lB}AtAeBPiL|C}A`EeBbEoCfB{A~BaE{AeKf@}@zB`AjBj@bB[zA}AtBiBnBwA`ALpAPdBVdFsBrEcAbDo@tC`@|C|BlDrCzFhDzB|C`Bx@zBx@hC|A~CTvBzAnD~BxBvAhEr@~Ch@pA|AbFvDrClCrAjCb@lF`@z@hBxBt@`DN`C~@pF~@rBlArAfEZfGoBxCoArB_EpAe@lDXdBOfBdDz@tEQ`Fe@hGvC_ArEQhAR|BtBhDtDnCfDxBHjCd@`CvAzCtBlCzClBzAdCrErBlCjC\\pC\\rB\~Ct@|CnAzCjBnDdC`Bk@|BIlDJjE~B`GfLhKr`@v@bAXx@JhDt@n@vA\\f@dBMnBj@rEhA~AjDtChBxBvAp@`AZfB\\xBRtAPzABfC?zBhA|Eq@d@z@_E|Dn@|CpC~B`DfBbB`GBfGg@nFPvHy@bF|ApDbBn@VzD|@tMGpJdBxE}AjJpEfFvAxBrClFjElDfCpBjBnBrBl@zA}CPwDtAqLnAaGl@gJpBeEbAwA|@gEvAqFtAqCfEuBhBg@~CkAtBwBtEaDzBeDtCuExBs@fAMfB_An@aB^k@pALnAZjAU~BwBpAwAfBiCxEgEnB{IrCuF`JiIjHiJfDuCpBaBt@uA\\uBm@qFs@yFrE_E|HcOnCwGHgBCgCyBkKGyDB}H\\aKzCgKdAcDb@aDh@}JbA_MfAeDGiHmAkL{DwHkCmJfBu@lCuA`CqAxDwItAcD~AsBv@m@lAjB~AdDdBpC`A~Ct@xAr@p@lBr@nAb@fAdAp@~@r@jAjAt@fB`Av@r@|@Zz@DvAWfGaBjFeBfABjAx@xAhDfA`DVxALhDIjCo@bD}@`D_A~BmArBsBjBiBjAqDTgFy@gEPaH|A}CfEOdEDxC\`CpClGfClEtAbAtEvCxDxAxF\\pId@bCTfDBzAVlClCpEhFjH`HfKfJoCpKIlDPbApDxBhCBhCq@hCwA|GkH|H_DlCnCv@qBnCgAvAiCpBuAzAcAjBmClAaDpCwE~EwIzEeHtAeCNsAyAoEs@iDJeHbAcHf@{BnAoGpAcK`AkHl@wFfAmGnAqB|AeFZuETkD`@uFnH_N`FwIxAqCoJil@sOc}@{Iih@iCoNmIyh@kDeToCgQoHgKoRqReMqMgGaFcE_NuDiLuCmFgAuHcCqNgD}FeHsIyImIgI{IsGyHuQoRyIgYcV}]_GoGaHsPgFwI~@sXxCmUdEu]hAqPkBcBcC}BcCaDiCw@cE^sEwAkEqDaE_FoGAiEtA}BaKiEiEsGwFkE}C{FyEgFv@mHtC_FdAcGlA}CNaBv@aEpGw@`BgCtDmBYyBo@yAe@}@WkB{FcBeDcBmFiBaGeCsCoFkGkCeEgDaFgD_CgDmC{CqDqB_DaAHwAv@c@kBYgDQsF]qEo@gEg@cE[eEg@oEs@mGuAe@cA{@e@Ww@Vi@n@cBReBHMoCK{AcAKeBCa@kAp@oElAgD@y@Uc@gAYg@[g@}@y@kAg@s@[kA_@gBMkBpBqCLyAv@iAjAXxClBl@`@p@fBBp@~Az@~Aj@nF^zEJrCcCfA[hAdAjAzAh@rAUpAs@bAk@`A`A`BR`BjA^f@[jAgA~AaBrEuEhDwClC[jI{DnGeE`JiGtGmK`C}Gb@yEAgJpDkIdB{Gv@uCv@g@lAyE\\oEtBcF|@eBf@iBfAm@jAS`Cq@dAWh@StAg@zBBtBAnCh@|@@`BkA`ADh@Pn@n@pAn@x@BbFk@nBc@pAeB`HkC`CgC`BgMnB_]jF}HbDyCDkCNuEoFaIcAuINaBhBiF~AsCzDeGuA{RtAaPNsMdB{LwDwJ{EsGcC{DmAiH_@gNiDcI{HbAmKpBcRvFuJzCuJbJcPbR}E|KiBnEiClD}Gt@gP`AoIdAwD`CyKhIkGzEeC~EaAhFiBvQuDda@{DxYsBfOqD~W[lBSfAwEcByF@oEa@yG}HgCiObBaPhAuHgDWL{Pp@_Sf@wLCoO_BwNiBeJwAgJ}CqGiI{MgE}GgBiCyBeDaDcFeCgEeBmC_DsE|BaE`D}FJsJgEdC{BvJ{AbCeAsBwAy@gAUyBAcFVwB|@kGoAmAg@wA{AkD{C{AqCuALkAf@oGyGyMkHwNoH}AuBb@uOfAsQReLyEoVEsNaBwVqEaUcEgUaDeRsE_WaIw_@{DaLqEeZmDe^mC{Jq\\qRiTwFyJWyEVmQaKeDuDqEyIoBwJ_@yFO_Za@qJyCiKeDsJ{D{D}D}DuDgC_Dp@mEjAiEzAuE|@mCQqCWiF`AgErEs@c@t@wNhAuO`A{IlC_PjBmMpAkHHsCf@eQ`BeJ^gL?eGAyDBiDbA{IrBuMhBkOTqDj@_Lv@}FtBqDzBkD|B}CbBuNVgS@q[`FeElFoJ|Bu[hAsPhCkGzAyFnB{GdG{JfKoMpFmBvDoFTmJh@oJdBwD\\uD_A}BqCq@}BoAqDaBsIcI}CiE_EsImC[eF|@kDgAkHyAoBVoBZwBTmD^{Dt@wFgE{DkCiBuAeAk@}AFiCTgCRyLVaLAuMaEgNwDkO_CoCg@yDy@oEgAuCi@gEcBgEwBgA}@cBaCk@eB]aCIkBGgEl@wE`@gCQmGZqOYsTEuBcAgF{AeHy@qEeAeEs@cDbBgCz@eKsDcQeAsPCcHM{BoB_FgAmCuCoF_DkHeCkFuAkDkFqFqCoC}BsAeCz@uBl@}DrAiDbA}Bl@sAEuCWiDa@uBLmCn@aCp@y@}@eEsDwByBcBsA_DaC}AeAcFgD}BgA}CwBeFyBgDeB{@k@_EaAwGsBwCeAsCaAsEwAyGgBiAi@yCaCeDmCqEqDsJwG{FiEgFoEcGsEoGuEkIcHwFkEg@cAWc@mBIwEEeDIgAOuABqBp@y@b@eD|AiGrCs@TeIa@yBB_AXs@R_@HwEfCoDt@_B]cAsBi@oAiBgD}A`AkCdBcB@qBt@yBfAcEvAs@L_BEaAGeA[i@o@_@w@]}@Uq@m@aAm@cAq@_AiBuAmAGgCCkBHs@J{@AwCJ_DLmE{CgIeB{F{BeKg@_Fk@uFeAcDiBkGaI_C}DoDwCoCcBeBkCqCcBeAm@_CG}BRgGT{Gh@eClBkC|C_EjDsB~AiBnAoBsEqAaGq@sGw@oDUkFyB{L}A_E}CwJE{L_E_Wx@cGnD_CxHaEqCg@yG_BkH_B{GkBqEo@{H}AuHgDwAcFwAgFaDL{JrKgBpDgB|FmCvFi@hEcD~FsIRqGq@{GrPKzAu@fN_BzL}DrFiFgAaKCkCbAq@`EeAf@aByGSsFyB}DwAiE_A}@}@{@_EeEN_AlCqBrBiHvCkIpD_ItB{Cl@sD?cIEgFrAoNz@wPo@_Cc@eEJeOz@iVKyHtAkMs@_JkCgD{BiEYeBo@iHAqE_AyIgDsJy@qGBeIsAgKh@kFnAkCF}D}FwE_CuR{CyGEoFMkGd@kKuAyFRwJ|@oG_CwEkFqFoHh@sDkNgCmFuDoEoGaGgHgXaKw`@bM_K|DoFxAmNh@wSLaKLkQC}HPsIhDcDlGcFhEmOk@oMzG{OpAaFw@wGc@{Dg@gGo@qI?cOgBcKDuDg@aIa@wPjBeLa@_D{BcCcAo@cCwIw@aIgAkJe@gJQaIEyBEaCUiDIqBOcC_@_ByA_DaByC{@mBq@qCIeCAoAHgATsBJwH?eEU{E_@wCaAgC}@w@y@q@[u@_@mAa@cBsAuE{@gCUq@m@uAoAaDq@_CO{As@Aw@z@cBRuE]yAEaAAeAm@w@]qCkAc@]uAY_AOeAUiAW_B]kAg@wAg@Do@FyAg@sAq@Sm@}@[kAq@w@}Ag@sAk@eAWo@aBr@aBJgCyAa@Y]]uAm@sB{@y@MeAg@wAoAgAsA_@eAOm@?_AGyAU]YgDcFoDmFwIoR{EqM}@{FyAgLtBwC`Hm@jDy@zB_IhB_HhD_NhEgGfHiJzG}HrCsD";
$(document).ready(function() {
	$('#pill1').click(function(e) {
		//initMapPointer();
		setTimeout(initMapPointer, 300);
		console.log("call initMapPointer");
	});
	$('#pill2').click(function(e) {
		$('#select_btn').empty();
		//ajax call and get level list for set button
		$.ajax
		({
			type: "GET",
			//dataType : 'json',
			//url: 'https://dev.smartcommunitylab.it/cedus/api/params/ordini',
			url:'../api/params/ordini',
			data: '' ,
			success: function (data) {
			console.log("data name:",data);
			$.each(data,function(key, val){
				var strVal="\"change_div('"+val+"')\"";
				//console.log('strVal:',strVal)
				$('#select_btn').append("<div class='row'><button type='button' class='btn btn-success btn-block' style='width:90%' onclick="+strVal+" >"+val+"</button></div><br/>");
			});
			
			//initMap(markers);	
			},
			failure: function() {console.log("Error!");}
		});
		setTimeout(initMap, 200);
	});
	//change the map on change of dropdown value
	$("#dropdownList").change(function(){
		globalCurrentMarkers=[];
        //console.log("level data:", $('#levelText').text());
        if($(this).val()){
	        //ajax call for markers (filter by tipologia)
	    	$.ajax
	    	({
	    		type: "GET",
	    		//dataType : 'json',
	    		//url: 'https://dev.smartcommunitylab.it/cedus/api/cover/education',
	    		url:'../api/cover/education',
	    		data: {ordine:$('#levelText').text(),tipologia:$(this).val(),filter:'TRANSIT_DISTANCE'} ,
	    		success: function (data) {
	    		//console.log("data name:",data['tuList']);
	    		$.each(data['tuList'],function(key, val){
	    			//console.log("data geocode:",val['geocode'][0]);
	    			globalCurrentMarkers.push({
	    			  lat: val['geocode'][1],
	    			  lng: val['geocode'][0],
	    			  name: val['name'],
	    			  codiceIstat: val['codiceIstat'],
	    			  address: val['address'],
	    			  description: val['description']
	    			});
	    		});
	    		drawMarkerInDistance(30);
	    		//initMap(markers);	
	    		},
	    		failure: function() {console.log("Error!");}
	    	});
        }
    });
	$("input[name='distanza']").change(function(){
		drawMarkerInDistance(parseInt($('#distanza').val()));
	});
	//plus in distanza
	$('.qtyplus').click(function(e){
        // Stop acting like a button
        e.preventDefault();
        // Get its current value
        var currentVal = $('#distanza').val();
        // If is not undefined
        if (currentVal) {
            // Increment
            $("input[name='distanza']").val(parseInt(currentVal) + 5);
            drawMarkerInDistance(parseInt($('#distanza').val()));
        } else {
            // Otherwise put a 0 there
        	$("input[name='distanza']").val(0);
        }
    });
	$('.qtyminus').click(function(e){
        // Stop acting like a button
        e.preventDefault();
        // Get its current value
        var currentVal = $('#distanza').val();
        // If is not undefined
        if (currentVal) {
            // Increment
            $("input[name='distanza']").val(parseInt(currentVal) - 5);
            drawMarkerInDistance(parseInt($('#distanza').val()));
        } else {
            // Otherwise put a 0 there
        	$("input[name='distanza']").val(0);
        }
    });
});
/*
$('.selectpicker').selectpicker({
	liveSearch: true, 
	showTick: true, 
	width: 'auto'
});
*/
function change_div(level_text){
	var markers = [];
	$('#select_btn').hide();
	$('#select_type').show();
	$('#levelText').text(level_text);
	//ajax call for markers (filter by level)
	$.ajax
	({
		type: "GET",
		//dataType : 'json',
		//url: 'https://dev.smartcommunitylab.it/cedus/api/cover/education',
		url:'../api/cover/education',
		data: {ordine:level_text,filter:'TRANSIT_DISTANCE'} ,
		success: function (data) {
			//console.log("data :",data);
			$.each(data['tuList'],function(key, val){
				//console.log("data geocode:",val['geocode'][0]);
				markers.push({
				  lat: val['geocode'][1],
				  lng: val['geocode'][0],
				  name: val['name'],
				  codiceIstat: val['codiceIstat'],
				  address: val['address'],
				  description: val['description']
				});
			});
			//var $select = $('select#dropdownList');
			$('select#dropdownList').empty();
			//initMap(markers);
			//ajax call for tipologia in dropdown box
			$.ajax
			({
				type: "GET",
				//dataType : 'json',
				//url: 'https://dev.smartcommunitylab.it/cedus/api/params/Tipologie',
				url:'../api/params/tipologie',
				data: '' ,
				success: function (data) {
				//console.log("data tipologia:",data);
				$("#dropdownList").append("<option value=''>Tipologia di selezione</option>");
				$.each(data,function(key, val){
					//console.log("data geocode:",val);
					//$("#dropdownList").append("<li><a href='#'>"+val+"</a></li>");
					$("#dropdownList").append("<option value='"+val+"'>"+val+"</option>");
				});
					
				},
				failure: function() {console.log("Error!");}
			});
		},
		failure: function() {console.log("Error!");}
	});
	
}
function back_div(){
	$('#select_btn').show();
	$('#select_type').hide();
	$('#levelText').text();
	initMap();	
}

function drawMarkerInDistance(distance){
	var validmarker =[];
	//console.log("distance:",distance);
	if(userlocation){
		$.each(globalCurrentMarkers,function(key,val){
			var fromPosition=new google.maps.LatLng(userlocation['lat'],userlocation['lng']);
			var toPositation=new google.maps.LatLng(val['lat'],val['lng']);
			
			var dis = (google.maps.geometry.spherical.computeDistanceBetween(fromPosition, toPositation)/1000).toFixed(2);
			
			if(dis<distance){
				validmarker.push(globalCurrentMarkers[key]);
			}
		});
		initMap(validmarker);
	}else{
		initMap(globalCurrentMarkers);
	}
	
}
function initMap(markers) {
	map = new google.maps.Map(document.getElementById('map'), {
	    zoom: 09,
	    center: {
	      	lat: 46.152947008922631,
	  		lng: 11.16226884897163
	    },
		//autoResize: false,
		/*
		styles: [
		{elementType: 'geometry', stylers: [{color: '#FFFFFF'}]},
		{elementType: 'labels.text.stroke', stylers: [{color: '#FFFFFF'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#FFFFFF'}]}            
		
		],
		*/
		mapTypeId: google.maps.MapTypeId.ROADMAP
	    /* mapTypeId: google.maps.MapTypeId.TERRAIN */
	});
	infoWindow = new google.maps.InfoWindow;
	if(markers){
		console.log("markers:",markers);
		$.each(markers,function(key, val){
			var infoWindowMarkers = new google.maps.InfoWindow;
			var marker = new google.maps.Marker({
				animation: google.maps.Animation.DROP,
				position: {lat:val['lat'],lng:val['lng']},
				map: map,
				title: val['name']
			});
			marker.addListener('click', function() {
				if(userlocation){
					var fromPosition=new google.maps.LatLng(userlocation['lat'],userlocation['lng']);
					var toPositation=new google.maps.LatLng(val['lat'],val['lng']);
					var distance = (google.maps.geometry.spherical.computeDistanceBetween(fromPosition, toPositation)/1000).toFixed(2);
					/*
					var directionsService = new google.maps.DirectionsService();
					var requestDriving = {
							  origin      : fromPosition, 
							  destination : toPositation,
							  travelMode  : google.maps.DirectionsTravelMode.DRIVING
							};
					directionsService.route(requestDriving, function(response, status) {
						if ( status == google.maps.DirectionsStatus.OK ) {
						    console.log("requestDriving distance:", response.rows[0].elements[0].distance.text ); // the distance in metres
							carDistance={
										distance: response.rows[0].elements[0].distance.text,
										duration: response.routes[0].legs[0].duration.text
									};
						}
						else {
							console.log("there's no route between these two locations");
						    // oops, there's no route between these two locations
						    // every time this happens, a kitten dies
							// so please, ensure your address is formatted properly
						}
					});
					*/
					//call for driving
					var service = new google.maps.DistanceMatrixService();
				    service.getDistanceMatrix({
				        origins: [fromPosition],
				        destinations: [toPositation],
				        //travelMode: google.maps.TravelMode['TRANSIT','DRIVING'],
				        travelMode: google.maps.TravelMode.DRIVING,
				        unitSystem: google.maps.UnitSystem.METRIC,
				        avoidHighways: false,
				        avoidTolls: false
				    }, function (response, status) {
				    	console.log("response",response);
				        if (status == google.maps.DistanceMatrixStatus.OK && response.rows[0].elements[0].status != "ZERO_RESULTS") {
				            var carDistance = response.rows[0].elements[0].distance.text;
				            var carDuration = response.rows[0].elements[0].duration.text;
				            
							//call for Transit
							var serviceTransit = new google.maps.DistanceMatrixService();
							serviceTransit.getDistanceMatrix({
						        origins: [fromPosition],
						        destinations: [toPositation],
						        travelMode: google.maps.TravelMode.TRANSIT,
						    }, function (responseTransit, statusTransit) {
						    	if (statusTransit == google.maps.DistanceMatrixStatus.OK && responseTransit.rows[0].elements[0].status != "ZERO_RESULTS"){
						    		var transitDistance= responseTransit.rows[0].elements[0].distance.text;
									var transitDuration= responseTransit.rows[0].elements[0].duration.text;
									infoWindowMarkers.setPosition({lat:val['lat'],lng:val['lng']});
									infoWindowMarkers.setContent("<b>"+val['name']+".</b><br/>Indirizzo: "+val['address']+"<br/>Descrizione: "
					                		+val['description']+"<br/><p>Distanza in "+distance
					                		+"KM</p><i class='material-icons'>directions_car</i>"+carDistance
					                		+" and "+carDuration+".<br/><i class='material-icons'>directions_bus</i>"+transitDistance+" and "+transitDuration+".");
									//infoWindowMarkers.setContent("<i class='material-icons'>directions_bus</i>"+transitDistance+" and "+transitDuration+".");
									infoWindowMarkers.open(map, marker);
						    	}
						    });
				            
							
				        } else {
				            alert("Unable to find the distance via road.");
				        }
				    });
					/*
					var dataSend={
							  "to": {
								    "lon": "",
								    "lat": ""
								  },
								  "routeType": "fastest",
								  "resultsNumber": 1,
								  "departureTime": "04:25PM",
								  "from": {
								    "lon": "",
								    "lat": ""
								  },
								  "date": "",
								  "transportTypes": [
								    "TRANSIT",
								    "CAR"
								  ]
								};
					dataSend['to']['lon']=val['lng'];
					dataSend['to']['lat']=val['lat'];
					dataSend['from']['lon']=userlocation['lng'];
					dataSend['from']['lat']=userlocation['lat'];
					var d = new Date();
					d.setDate(d.getDate() + (1 + 7 - d.getDay()) % 7);
					//dataSend['date']=d.getMonth()+"/"+d.getDate()+"/"+d.getFullYear();
					dataSend['date']=moment(d).format("MM/DD/YYYY");
					console.log("Date:",dataSend['date']);
					//ajax call for collect distance
					$.ajax
					({
						type: "POST",
						contentType: "application/json;charset=UTF-8",
						url:"https://os.smartcommunitylab.it/core.mobility/plansinglejourney",
						data: JSON.stringify(dataSend),
						dataType : "json",
						//async: false,
						success: function (data) {
							console.log("data from api:",data);
							infoWindow.setPosition({lat:val['lat'],lng:val['lng']});
			                infoWindow.setContent("<b>"+val['name']+".</b><br/>Indirizzo: "+val['address']+"<br/>Descrizione: "
			                		+val['description']+"<br/><p>Distanza in "+data[0]['leg'][0]['legGeometery']['length']
			                		+"KM</p><i class='material-icons'>directions_car</i><br/><i class='material-icons'>directions_bus</i><br/><i class='material-icons'>directions_railway</i>");
			                infoWindow.open(map, marker);
						},
						failure: function() {console.log("error from api:");}
					});
					*/
				    //console.log("carDistance Array:",carDistance);
				    
					
				} 
            });
		});
		
	}
	//current position
	// Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        userlocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        //userlocation=new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
        var marker = new google.maps.Marker({
			position: userlocation,
			map: map,
			//title: 'user',
			icon:"../images/marker_green.png"
		});
		
        map.setCenter(userlocation);
        marker.addListener('click', function() {
        	infoWindow.setPosition(userlocation);
            infoWindow.setContent("<b>La Tua Posizione.</b><br/>Lat: "+userlocation['lat']+"<br/>Lng: "+userlocation['lng']);
            infoWindow.open(map, marker);
        });
      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
	
	// Define the LatLng coordinates for the polygon's path.

	var decode=[];
	
	$.each(allGeoData,function(key, val){
		decode.push(google.maps.geometry.encoding.decodePath(val['enString'][0]));
		if(val['enString'][1]){
			decode.push(google.maps.geometry.encoding.decodePath(val['enString'][1]));
			//console.log('key: ',key,'.enString: ',val['enString'][1]);
		}
		
	});
	
	
	// Construct the polygon.
  	var polygons = new google.maps.Polygon({
	    paths: decode,
	    strokeColor: '#FFFFFF',
	    strokeOpacity: 0.8,
	    strokeWeight: 2,
	    fillColor: '#000000',
	    fillOpacity: 0.35
  	});
  	polygons.setMap(map);
	google.maps.event.trigger(map, 'resize');
  
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}

function initMapPointer(){
	mapPointer = new google.maps.Map(document.getElementById('mapPointer'), {
	    zoom: 09,
	    center: {
	      	lat: 46.152947008922631,
	  		lng: 11.16226884897163
	    },		
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});
	
	// Define the LatLng coordinates for the polygon's path.
	var decode=[];

	$.each(allGeoData,function(key, val){
		decode.push(google.maps.geometry.encoding.decodePath(val['enString'][0]));
		if(val['enString'][1]){
			decode.push(google.maps.geometry.encoding.decodePath(val['enString'][1]));
		}
		
	});
	
	// Construct the polygon.
  	var polygons = new google.maps.Polygon({
	    paths: decode,
	    strokeColor: '#FFFFFF',
	    strokeOpacity: 0.8,
	    strokeWeight: 2,
	    fillColor: "#494949",
	    fillOpacity: 0.35
  	});
  	//console.log("decode polygons:",polygons);
  	polygons.setMap(mapPointer);
  	google.maps.event.trigger(mapPointer, 'resize');
}



