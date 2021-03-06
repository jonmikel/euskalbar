/*
 * Euskalbar - A Firefox extension for helping in Basque translations.
 * Copyright (C) 2013 Euskalbar Taldea (see AUTHORS file)
 *
 * This file is part of Euskalbar.
 *
 * Euskalbar is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

"use strict";

if (!euskalbar) var euskalbar = {};

if (!euskalbar.dicts) euskalbar.dicts = {};

euskalbar.dicts.labayru = function () {

  var $U = euskalbar.lib.utils;

  return {
    displayName: 'Labayru',
    description: 'Labayru Hiztegia',

    homePage: "http://hiztegia.labayru.net/",

    pairs: ['eu-es', 'es-eu'],

    method: 'POST',

    mimetype: "text/html; charset=ISO-8859-1",

    getUrl: function (term, source, target) {
      if (source === 'es') {
        return 'http://hiztegia.labayru.net/CargaListaPalabras.asp';
      } else {
        return 'http://hiztegia.labayru.net/CargaListaPalabrasEU.asp';
      }
    },

    getParams: function (term, source, target) {
      return {
        'opc': '1',
        'txtPalabra': term
      };
    },

    scrap: function (term, source, target, data) {
      var uiLang = $U.langCode(euskalbar.ui.locale),
          output = '';

      if (data.match("No hay resultados") ||
          data.match("Ez dago holakorik")) {
        // TODO: i18n
        output = "Ez da aurkitu " + term + " hitza.";
      } else {
        output = data.split("HiztegiaPalabra");
        output = output[1].slice(2 + term.length, output[1].indexOf("<form"));
        output = "<p><b>" + term + "</b></p><br/>" + output;
        output = output.replace(
            /<td/g,
            "<p"
        );
        output = output.replace(
            /<\/td/g,
            "<\/p"
        );
        output = output.replace(
            /<tr/g,
            "<p"
        );
        output = output.replace(
            /<\/tr/g,
            "<\/p"
        );
        output = output.replace(
            /CargaPalabra/g,
            "http://zerbitzuak.labayru.org/diccionario/CargaPalabra"
        );
      }

      return output;
    },

  };

}();
