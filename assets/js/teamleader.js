"use strict";

function _classCallCheck(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _classCallCheck(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

var _createClass = function () {
  function e(e, t) {
    for (var a = 0; a < t.length; a++) {
      var i = t[a];
      i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
    }
  }

  return function (t, a, i) {
    return a && e(t.prototype, a), i && e(t, i), t
  }
}(), Admin = function () {
  function e(t) {
    _classCallCheck(this, e), this.key = t.key, this.url = t.url, this.nonce = t.nonce, this.container = t.container, this.forms = [];
    try {
      this.init()
    } catch (e) {
      console.log("Error:" + e)
    }
  }

  return _createClass(e, [{
    key: "getElement", value: function (e) {
      return this.container.find(e)
    }
  }, {
    key: "init", value: function () {
      return this.bindCreateForm().bindDeleteForm().bindEditForm().bindReCaptcha().bindLogo().bindSaveOptions(), this
    }
  }, {
    key: "bindLogo", value: function () {
      var e = this.getElement("[data-action=logo]"), t = this.getElement("[data-container=logo]");
      return e.attr("checked") && t.show(), e.click(function () {
        t.toggle()
      }), this
    }
  }, {
    key: "bindReCaptcha", value: function () {
      var e = this.getElement("[data-action=recaptcha]"), t = this.getElement("[data-container=recaptcha]");
      return e.attr("checked") && t.show(), e.click(function () {
        t.toggle("normal")
      }), this
    }
  }, {
    key: "bindCreateForm", value: function () {
      var e = this, t = this.getElement("[data-action=createForm]");
      return t.click(function (a) {
        a.preventDefault(), t.hide(), e.createForm()
      }), this
    }
  }, {
    key: "createForm", value: function () {
      var e = jQuery(document.createElement("div")), t = this.getElement("#template").html();
      e.html(t), e.hide(), e.find("[data-element=titleEdit]").hide(), e.find("[data-action=saveForm]").hide(), this.forms.push(e), this.getElement("[data-container=create]").html(e).fadeIn(), this.bindSaveNewForm(e.find("[data-action=addForm]")), this.bindDiscardNewForm(e.find("[data-action=discardForm]")), e.fadeIn()
    }
  }, {
    key: "editForm", value: function (e) {
      var t = this, a = jQuery(document.createElement("div")), i = this.getElement("#template").html();
      a.html(i), a.hide(), a.find("[data-element=titleCreate]").hide(), a.find("[data-action=addForm]").hide(), jQuery.ajax({
        url: this.url,
        method: "post",
        data: { action: "teamleader_get", nonce: this.nonce, id: e },
        dataType: "json",
        success: function (e) {
          return !0 === e.success && e.form || !e.message ? (t.fillForm(a, e.form), !0) : t.showMessage(e.message)
        },
        error: function () {
          t.showMessage("Server error. Please, try again")
        }
      }), this.getElement("[data-container=edit]").html(a).fadeIn(), this.bindSaveForm(a.find("[data-action=saveForm]"), e), this.bindDiscardNewForm(a.find("[data-action=discardForm]")), a.fadeIn()
    }
  }, {
    key: "fillForm", value: function (e, t) {
      var a = e.find(".tl__field");
      t.form && (t.form.title && e.find("[data-element=formTitle]").val(t.form.title), t.form.submit && e.find("[data-element=formSubmit]").val(t.form.submit), t.form.success && e.find("[data-element=formSuccess]").val(t.form.success), jQuery.each(a, function (e, a) {
        var i = jQuery(a), n = i.data("param"), r = t[n];
        r && (r.active && (i.find("[data-element=active]").attr("checked", "checked")), r.label && i.find("[data-element=label]").val(r.label), r.default && i.find("[data-element=default]").val(r.default), r.required && (i.find("[data-element=requiredTrue]").attr("checked", "checked")), r.hidden && (i.find("[data-element=hiddenTrue]").attr("checked", "checked")))
      }))
    }
  }, {
    key: "getFormData", value: function (e) {
      var t = e.serializeArray(), a = {};
      return jQuery.map(t, function (e) {
        a[e.name] = e.value
      }), a
    }
  }, {
    key: "bindSaveForm", value: function (e, t) {
      var a = this;
      e.click(function () {
        var i = e.closest("form"), n = i.find("[data-element=formTitle]");
        if ("" === n.val()) return a.showMessage("Form title is empty", !1), void n.addClass("error");
        n.removeClass("error");
        var r = a.getFormData(i);
        r.action = "teamleader_save", r.nonce = a.nonce, r.id = t;
        jQuery.ajax({
          url: a.url, method: "post", data: r, dataType: "json", success: function (e) {
            a.showMessage(e.message), !0 === e.success && (a.getElement("[data-container=edit]").fadeOut(), a.showMessage("Form saved"), a.getElement("[data-element=form" + t + "]").find("[data-element=formTitle]").text(n.val()))
          }, error: function () {
            a.showMessage("Server error. Please, try again")
          }
        })
      })
    }
  }, {
    key: "bindSaveNewForm", value: function (e) {
      var t = this;
      e.click(function () {
        var a = e.closest("form"), i = a.find("[data-element=formTitle]");
        if ("" === i.val()) return t.showMessage("Form title is empty", !1), void i.addClass("error");
        i.removeClass("error");
        var n = t.getFormData(a);
        n.action = "teamleader_create", n.nonce = t.nonce;
        jQuery.ajax({
          url: t.url, method: "post", data: n, dataType: "json", success: function (e) {
            t.showMessage(e.message), !0 === e.success && function (e) {
              t.getElement("[data-container=create]").fadeOut(), t.getElement("[data-action=createForm]").fadeIn("normal"), t.showMessage("Form added"), t.displayNewForm(e, i.val())
            }(e.id)
          }, error: function () {
            t.showMessage("Server error. Please, try again")
          }
        })
      })
    }
  }, {
    key: "displayNewForm", value: function (e, t) {
      var a = jQuery(document.createElement("div")), i = this.getElement("#templateForm").html();
      a.html(i), a.hide(), a.find("[data-element=title]").html(t), a.find("[data-element=id]").html(e), a.find("[data-action=editForm]").data("param", e), a.find("[data-action=deleteForm]").data("param", e), this.forms.push(a), this.getElement("[data-container=forms]").append(a), a.fadeIn("normal"), this.bindDeleteForm(), this.bindEditForm()
    }
  }, {
    key: "bindDiscardNewForm", value: function (e) {
      var t = this;
      e.click(function () {
        t.getElement("[data-container=create]").fadeOut()
      })
    }
  }, {
    key: "bindDiscardForm", value: function (e) {
      var t = this;
      e.click(function () {
        t.getElement("[data-container=edit]").fadeOut()
      })
    }
  }, {
    key: "bindSaveOptions", value: function () {
      var e = this, t = this.getElement("[data-action=save-options]");
      t.click(function (a) {
        a.preventDefault(), e.saveOptions(t)
      })
    }
  }, {
    key: "saveOptions", value: function (e) {
      var t = this, a = e.closest("form"), i = { action: "teamleader_options", nonce: this.nonce };
      jQuery(a.serializeArray()).each(function (e, t) {
        i[t.name] = t.value
      }), jQuery.ajax({
        url: this.url, method: "post", data: i, dataType: "json", success: function (e) {
          t.showMessage(e.message)
        }, error: function (e) {
          console.log(e), t.showMessage("Server error. Please, try again")
        }
      })
    }
  }, {
    key: "bindDeleteForm", value: function () {
      var e = this, t = this.getElement("[data-action=deleteForm]");
      return t.unbind(), t.click(function (t) {
        var a = jQuery(t.target);
        e.deleteForm(a)
      }), this
    }
  }, {
    key: "deleteForm", value: function (e) {
      var t = this;
      jQuery.ajax({
        url: this.url,
        method: "post",
        data: { action: "teamleader_delete", nonce: this.nonce, id: e.data("param") },
        dataType: "json",
        success: function (a) {
          t.showMessage(a.message), !0 === a.success && e.closest("[data-element=form]").fadeOut("normal")
        },
        error: function (e) {
          console.log(e), t.showMessage("Server error. Please, try again")
        }
      })
    }
  }, {
    key: "bindEditForm", value: function () {
      var e = this;
      return this.getElement("[data-action=editForm]").click(function (t) {
        var a = jQuery(t.target);
        e.editForm(a.data("param"))
      }), this
    }
  }, {
    key: "showMessage", value: function () {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", t = arguments[1],
        a = this.getElement("[data-action=message]");
      a.html(e), a.removeClass("success error"), !0 === t ? a.addClass("success") : !1 === t && a.addClass("failed"), a.addClass("status").fadeIn("normal"), setTimeout(function () {
        a.fadeOut("normal").html("")
      }, 5e3)
    }
  }]), e
}(), TeamleaderAdmin = function (e) {
  new Admin(e)
}, _createClass = function () {
  function e(e, t) {
    for (var a = 0; a < t.length; a++) {
      var i = t[a];
      i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
    }
  }

  return function (t, a, i) {
    return a && e(t.prototype, a), i && e(t, i), t
  }
}(), Front = function () {
  function e(t) {
    _classCallCheck(this, e), this.url = t.url, this.nonce = t.nonce, this.container = t.container, this.form = this.container.find("form"), this.success = this.container.find("[data-success]"), this.error = this.container.find("[data-error]"), this.timeout = 1e4;
    try {
      this.init()
    } catch (e) {
      console.log("Error:" + e)
    }
  }

  return _createClass(e, [{
    key: "send", value: function () {
      var e = this, t = "action=teamleader&nonce=" + this.nonce + "&" + this.form.serialize(), a = !1;
      this.form.find("input").each(function (e, t) {
        var i = jQuery(t);
        i.prop("required") && 0 === i.val().length ? (i.addClass("invalid"), a = !0) : i.removeClass("invalid")
      }), a || jQuery.ajax({
        method: "POST", url: this.url, data: t, success: function (t) {
          var a = jQuery.parseJSON(t);
          if (!0 === a.success) return e.form.hide(), e.error.hide(), e.success.fadeIn(), void setTimeout(function () {
            e.success.fadeOut(), e.form.fadeIn()
          }, e.timeout);
          e.form.hide(), e.success.hide(), e.error.fadeIn(), a.message && e.error.html(a.message), setTimeout(function () {
            e.error.fadeOut(), e.form.fadeIn()
          }, e.timeout)
        }
      })
    }
  }, {
    key: "init", value: function () {
      var e = this;
      this.form.submit(function (t) {
        t.preventDefault(), e.send()
      })
    }
  }]), e
}(), TeamleaderFront = function (e) {
  return new Front(e)
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlYW1sZWFkZXItYWRtaW4uanMiLCJ0ZWFtbGVhZGVyLWZyb250LmpzIl0sIm5hbWVzIjpbIkFkbWluIiwib3B0aW9ucyIsIl9jbGFzc0NhbGxDaGVjayIsInRoaXMiLCJrZXkiLCJ1cmwiLCJub25jZSIsImNvbnRhaW5lciIsImZvcm1zIiwiaW5pdCIsImUiLCJjb25zb2xlIiwibG9nIiwic2VsZWN0b3IiLCJmaW5kIiwiYmluZEFjdGl2ZSIsImJpbmRDcmVhdGVGb3JtIiwiYmluZERlbGV0ZUZvcm0iLCJiaW5kRWRpdEZvcm0iLCJiaW5kUmVDYXB0Y2hhIiwiYmluZExvZ28iLCJiaW5kU2F2ZU9wdGlvbnMiLCJlbCIsImdldEVsZW1lbnQiLCJjbGljayIsImF0dHIiLCJjbG9zZXN0IiwicmVtb3ZlQ2xhc3MiLCJhZGRDbGFzcyIsInNob3ciLCJ0b2dnbGUiLCJfdGhpcyIsImJ1dHRvbiIsInByZXZlbnREZWZhdWx0IiwiaGlkZSIsImNyZWF0ZUZvcm0iLCJmb3JtIiwialF1ZXJ5IiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwidGVtcGxhdGUiLCJodG1sIiwicHVzaCIsImZhZGVJbiIsImJpbmRTYXZlTmV3Rm9ybSIsImJpbmREaXNjYXJkTmV3Rm9ybSIsImJpbmRBY3RpdmF0ZUZpZWxkIiwiYmluZFJlcXVpcmVkRmllbGQiLCJiaW5kSGlkZGVuRmllbGQiLCJpZCIsIl90aGlzMiIsImFqYXgiLCJtZXRob2QiLCJkYXRhIiwiYWN0aW9uIiwiZGF0YVR5cGUiLCJzdWNjZXNzIiwicmVzcG9uc2UiLCJtZXNzYWdlIiwiZmlsbEZvcm0iLCJzaG93TWVzc2FnZSIsImVycm9yIiwiYmluZFNhdmVGb3JtIiwiZmllbGRzIiwidGl0bGUiLCJ2YWwiLCJzdWJtaXQiLCJlYWNoIiwiaSIsImZpZWxkIiwiZmllbGREYXRhIiwiYWN0aXZlIiwicmVtb3ZlQXR0ciIsImxhYmVsIiwiZGVmYXVsdCIsInJlcXVpcmVkIiwiaGlkZGVuIiwidW5pbmRleGVkQXJyYXkiLCJzZXJpYWxpemVBcnJheSIsImluZGV4ZWRBcnJheSIsIm1hcCIsIm4iLCJuYW1lIiwidmFsdWUiLCJfdGhpczMiLCJnZXRGb3JtRGF0YSIsImZhZGVPdXQiLCJ0ZXh0IiwiX3RoaXM0IiwiZGlzcGxheU5ld0Zvcm0iLCJhcHBlbmQiLCJfdGhpczUiLCJfdGhpczYiLCJfdGhpczciLCJzYXZlT3B0aW9ucyIsIl90aGlzOCIsImNoZWNrYm94IiwidGFyZ2V0IiwiaGlkZGVuUmFkaW8iLCJyZXF1aXJlZENvbnRhaW5lciIsInJlcXVpcmVkUmFkaW8iLCJoaWRkZW5Db250YWluZXIiLCJfdGhpczkiLCJidXR0b25zIiwidW5iaW5kIiwiZGVsZXRlRm9ybSIsIl90aGlzMTAiLCJfdGhpczExIiwiZWRpdEZvcm0iLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJ1bmRlZmluZWQiLCJzZXRUaW1lb3V0IiwiVGVhbWxlYWRlckFkbWluIiwiRnJvbnQiLCJ0aW1lb3V0Iiwic2VyaWFsaXplIiwiaGFzRXJyb3IiLCJpbnB1dCIsInByb3AiLCJyZXN1bHQiLCJwYXJzZUpTT04iLCJzZW5kIiwiVGVhbWxlYWRlckZyb250Il0sIm1hcHBpbmdzIjoieWVBSU1BLE1BQUFBLFdBQ0osU0FBQUEsRUFBWUMsR0FBU0MsZ0JBQUFDLEtBQUFILEdBQ25CRyxLQUFLQyxJQUFNSCxFQUFRRyxJQUNuQkQsS0FBS0UsSUFBTUosRUFBUUksSUFDbkJGLEtBQUtHLE1BQVFMLEVBQVFLLE1BQ3JCSCxLQUFLSSxVQUFZTixFQUFRTSxVQUN6QkosS0FBS0ssU0FFTCxJQUNFTCxLQUFLTSxPQUNMLE1BQU9DLEdBQ1BDLFFBQVFDLElBQVIsU0FBcUJGLDREQVFkRyxHQUNULE9BQU9WLEtBQUtJLFVBQVVPLEtBQUtELGtDQWMzQixPQVBBVixLQUFLWSxhQUNGQyxpQkFDQUMsaUJBQ0FDLGVBQ0FDLGdCQUNBQyxXQUNBQyxrQkFDSWxCLDBDQU9QLElBQU1tQixFQUFLbkIsS0FBS29CLFdBQVcsZ0NBUTNCLE9BUEFELEVBQUdFLE1BQU0sV0FDSEYs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U0FFUGMsRUFBU0MsU0FDWDNCLEVBQUs4QixNQUFNcEIsS0FBS2dCLEVBQVNDLFNBRzNCc0QsV0FBVyxXQUNUakYsRUFBSzhCLE1BQU15QixVQUNYdkQsRUFBS0ssS0FBS08sVUFDVFosRUFBS29GLDJDQUlQLElBQUFqRSxFQUFBL0MsS0FDTEEsS0FBS2lDLEtBQUs4QixPQUFPLFNBQUN4RCxHQUNoQkEsRUFBRXVCLGlCQUNGaUIsRUFBS3dFLGVBekVMUixHQThFQVMsZ0JBQWtCLFNBQUExSCxHQUFBLE9BQVcsSUFBSWlILE1BQU1qSCIsImZpbGUiOiJ0ZWFtbGVhZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgbm8tdW5kZWYsbm8tY29uc29sZSAqL1xuLyoqXG4gKiBnbG9iYWwgZG9jdW1lbnQsICRcbiAqL1xuY2xhc3MgQWRtaW4ge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgdGhpcy5rZXkgPSBvcHRpb25zLmtleTtcbiAgICB0aGlzLnVybCA9IG9wdGlvbnMudXJsO1xuICAgIHRoaXMubm9uY2UgPSBvcHRpb25zLm5vbmNlO1xuICAgIHRoaXMuY29udGFpbmVyID0gb3B0aW9ucy5jb250YWluZXI7XG4gICAgdGhpcy5mb3JtcyA9IFtdO1xuXG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKGBFcnJvcjoke2V9YCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBzZWxlY3RvclxuICAgKiBAcmV0dXJuIG9iamVjdFxuICAgKi9cbiAgZ2V0RWxlbWVudChzZWxlY3Rvcikge1xuICAgIHJldHVybiB0aGlzLmNvbnRhaW5lci5maW5kKHNlbGVjdG9yKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJuIEFwcFxuICAgKi9cbiAgaW5pdCgpIHtcbiAgICB0aGlzLmJpbmRBY3RpdmUoKVxuICAgICAgLmJpbmRDcmVhdGVGb3JtKClcbiAgICAgIC5iaW5kRGVsZXRlRm9ybSgpXG4gICAgICAuYmluZEVkaXRGb3JtKClcbiAgICAgIC5iaW5kUmVDYXB0Y2hhKClcbiAgICAgIC5iaW5kTG9nbygpXG4gICAgICAuYmluZFNhdmVPcHRpb25zKCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybiBBcHBcbiAgICovXG4gIGJpbmRBY3RpdmUoKSB7XG4gICAgY29uc3QgZWwgPSB0aGlzLmdldEVsZW1lbnQoJy5hY3RpdmUgaW5wdXRbdHlwZT1jaGVja2JveF0nKTtcbiAgICBlbC5jbGljaygoKSA9PiB7XG4gICAgICBpZiAoZWwuYXR0cignY2hlY2tlZCcpKSB7XG4gICAgICAgIGVsLmNsb3Nlc3QoJy5maWVsZCcpLnJlbW92ZUNsYXNzKCdkaXNhYmxlZCcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWwuY2xvc2VzdCgnLmZpZWxkJykuYWRkQ2xhc3MoJ2Rpc2FibGVkJyk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybiBBcHBcbiAgICovXG4gIGJpbmRMb2dvKCkge1xuICAgIGNvbnN0IGVsID0gdGhpcy5nZXRFbGVtZW50KCdbZGF0YS1hY3Rpb249bG9nb10nKTtcbiAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLmdldEVsZW1lbnQoJ1tkYXRhLWNvbnRhaW5lcj1sb2dvXScpO1xuXG4gICAgaWYgKGVsLmF0dHIoJ2NoZWNrZWQnKSkge1xuICAgICAgY29udGFpbmVyLnNob3coKTtcbiAgICB9XG5cbiAgICBlbC5jbGljaygoKSA9PiB7XG4gICAgICBjb250YWluZXIudG9nZ2xlKCk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJuIEFwcFxuICAgKi9cbiAgYmluZFJlQ2FwdGNoYSgpIHtcbiAgICBjb25zdCBlbCA9IHRoaXMuZ2V0RWxlbWVudCgnW2RhdGEtYWN0aW9uPXJlY2FwdGNoYV0nKTtcbiAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLmdldEVsZW1lbnQoJ1tkYXRhLWNvbnRhaW5lcj1yZWNhcHRjaGFdJyk7XG5cbiAgICBpZiAoZWwuYXR0cignY2hlY2tlZCcpKSB7XG4gICAgICBjb250YWluZXIuc2hvdygpO1xuICAgIH1cblxuICAgIGVsLmNsaWNrKCgpID0+IHtcbiAgICAgIGNvbnRhaW5lci50b2dnbGUoJ25vcm1hbCcpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybiBBcHBcbiAgICovXG4gIGJpbmRDcmVhdGVGb3JtKCkge1xuICAgIGNvbnN0IGJ1dHRvbiA9IHRoaXMuZ2V0RWxlbWVudCgnW2RhdGEtYWN0aW9uPWNyZWF0ZUZvcm1dJyk7XG5cbiAgICBidXR0b24uY2xpY2soKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGJ1dHRvbi5oaWRlKCk7XG4gICAgICB0aGlzLmNyZWF0ZUZvcm0oKTtcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBjcmVhdGVGb3JtKCkge1xuICAgIGNvbnN0IGZvcm0gPSBqUXVlcnkoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JykpO1xuICAgIGNvbnN0IHRlbXBsYXRlID0gdGhpcy5nZXRFbGVtZW50KCcjdGVtcGxhdGUnKS5odG1sKCk7XG5cbiAgICBmb3JtLmh0bWwodGVtcGxhdGUpO1xuICAgIGZvcm0uaGlkZSgpO1xuICAgIGZvcm0uZmluZCgnW2RhdGEtZWxlbWVudD10aXRsZUVkaXRdJykuaGlkZSgpO1xuICAgIGZvcm0uZmluZCgnW2RhdGEtYWN0aW9uPXNhdmVGb3JtXScpLmhpZGUoKTtcblxuICAgIHRoaXMuZm9ybXMucHVzaChmb3JtKTtcblxuICAgIHRoaXMuZ2V0RWxlbWVudCgnW2RhdGEtY29udGFpbmVyPWNyZWF0ZV0nKS5odG1sKGZvcm0pLmZhZGVJbigpO1xuXG4gICAgdGhpcy5iaW5kU2F2ZU5ld0Zvcm0oZm9ybS5maW5kKCdbZGF0YS1hY3Rpb249YWRkRm9ybV0nKSk7XG4gICAgdGhpcy5iaW5kRGlzY2FyZE5ld0Zvcm0oZm9ybS5maW5kKCdbZGF0YS1hY3Rpb249ZGlzY2FyZEZvcm1dJykpO1xuICAgIHRoaXMuYmluZEFjdGl2YXRlRmllbGQoZm9ybS5maW5kKCdbZGF0YS1hY3Rpb249YWN0aXZhdGVGaWVsZF0nKSk7XG4gICAgdGhpcy5iaW5kUmVxdWlyZWRGaWVsZChmb3JtLmZpbmQoJ1tkYXRhLWFjdGlvbj1yZXF1aXJlZEZpZWxkXScpKTtcbiAgICB0aGlzLmJpbmRIaWRkZW5GaWVsZChmb3JtLmZpbmQoJ1tkYXRhLWFjdGlvbj1oaWRkZW5GaWVsZF0nKSk7XG5cbiAgICBmb3JtLmZhZGVJbigpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBlZGl0Rm9ybShpZCkge1xuICAgIGNvbnN0IGZvcm0gPSBqUXVlcnkoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JykpO1xuICAgIGNvbnN0IHRlbXBsYXRlID0gdGhpcy5nZXRFbGVtZW50KCcjdGVtcGxhdGUnKS5odG1sKCk7XG5cbiAgICBmb3JtLmh0bWwodGVtcGxhdGUpO1xuICAgIGZvcm0uaGlkZSgpO1xuICAgIGZvcm0uZmluZCgnW2RhdGEtZWxlbWVudD10aXRsZUNyZWF0ZV0nKS5oaWRlKCk7XG4gICAgZm9ybS5maW5kKCdbZGF0YS1hY3Rpb249YWRkRm9ybV0nKS5oaWRlKCk7XG5cbiAgICBqUXVlcnkuYWpheCh7XG4gICAgICB1cmw6IHRoaXMudXJsLFxuICAgICAgbWV0aG9kOiAncG9zdCcsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIGFjdGlvbjogJ3RlYW1sZWFkZXJfZ2V0JyxcbiAgICAgICAgbm9uY2U6IHRoaXMubm9uY2UsXG4gICAgICAgIGlkLFxuICAgICAgfSxcbiAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICBzdWNjZXNzOiAocmVzcG9uc2UpID0+IHtcbiAgICAgICAgaWYgKChyZXNwb25zZS5zdWNjZXNzICE9PSB0cnVlIHx8ICFyZXNwb25zZS5mb3JtKSAmJiByZXNwb25zZS5tZXNzYWdlKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuc2hvd01lc3NhZ2UocmVzcG9uc2UubWVzc2FnZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmZpbGxGb3JtKGZvcm0sIHJlc3BvbnNlLmZvcm0pO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0sXG4gICAgICBlcnJvcjogKCkgPT4ge1xuICAgICAgICB0aGlzLnNob3dNZXNzYWdlKCdTZXJ2ZXIgZXJyb3IuIFBsZWFzZSwgdHJ5IGFnYWluJyk7XG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgdGhpcy5nZXRFbGVtZW50KCdbZGF0YS1jb250YWluZXI9ZWRpdF0nKS5odG1sKGZvcm0pLmZhZGVJbigpO1xuXG4gICAgdGhpcy5iaW5kU2F2ZUZvcm0oZm9ybS5maW5kKCdbZGF0YS1hY3Rpb249c2F2ZUZvcm1dJyksIGlkKTtcbiAgICB0aGlzLmJpbmREaXNjYXJkTmV3Rm9ybShmb3JtLmZpbmQoJ1tkYXRhLWFjdGlvbj1kaXNjYXJkRm9ybV0nKSk7XG4gICAgdGhpcy5iaW5kQWN0aXZhdGVGaWVsZChmb3JtLmZpbmQoJ1tkYXRhLWFjdGlvbj1hY3RpdmF0ZUZpZWxkXScpKTtcbiAgICB0aGlzLmJpbmRSZXF1aXJlZEZpZWxkKGZvcm0uZmluZCgnW2RhdGEtYWN0aW9uPXJlcXVpcmVkRmllbGRdJykpO1xuICAgIHRoaXMuYmluZEhpZGRlbkZpZWxkKGZvcm0uZmluZCgnW2RhdGEtYWN0aW9uPWhpZGRlbkZpZWxkXScpKTtcblxuICAgIGZvcm0uZmFkZUluKCk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIGZvcm1cbiAgICogQHBhcmFtIGRhdGFcbiAgICovXG4gIGZpbGxGb3JtKGZvcm0sIGRhdGEpIHtcbiAgICBjb25zdCBmaWVsZHMgPSBmb3JtLmZpbmQoJy50bF9fZmllbGQnKTtcblxuICAgIGlmICghZGF0YS5mb3JtKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGRhdGEuZm9ybS50aXRsZSkge1xuICAgICAgZm9ybS5maW5kKCdbZGF0YS1lbGVtZW50PWZvcm1UaXRsZV0nKS52YWwoZGF0YS5mb3JtLnRpdGxlKTtcbiAgICB9XG5cbiAgICBpZiAoZGF0YS5mb3JtLnN1Ym1pdCkge1xuICAgICAgZm9ybS5maW5kKCdbZGF0YS1lbGVtZW50PWZvcm1TdWJtaXRdJykudmFsKGRhdGEuZm9ybS5zdWJtaXQpO1xuICAgIH1cblxuICAgIGlmIChkYXRhLmZvcm0uc3VjY2Vzcykge1xuICAgICAgZm9ybS5maW5kKCdbZGF0YS1lbGVtZW50PWZvcm1TdWNjZXNzXScpLnZhbChkYXRhLmZvcm0uc3VjY2Vzcyk7XG4gICAgfVxuXG4gICAgalF1ZXJ5LmVhY2goZmllbGRzLCAoaSwgZWwpID0+IHtcbiAgICAgIGNvbnN0IGZpZWxkID0galF1ZXJ5KGVsKTtcbiAgICAgIGNvbnN0IGtleSA9IGZpZWxkLmRhdGEoJ3BhcmFtJyk7XG4gICAgICBjb25zdCBmaWVsZERhdGEgPSBkYXRhW2tleV07XG5cbiAgICAgIGlmIChmaWVsZERhdGEpIHtcbiAgICAgICAgaWYgKGZpZWxkRGF0YS5hY3RpdmUpIHtcbiAgICAgICAgICBmaWVsZC5yZW1vdmVDbGFzcygndGxfX2Rpc2FibGVkJyk7XG4gICAgICAgICAgZmllbGQuZmluZCgnW2RhdGEtZWxlbWVudD1hY3RpdmVdJykuYXR0cignY2hlY2tlZCcsICdjaGVja2VkJyk7XG4gICAgICAgICAgZmllbGQuZmluZCgnaW5wdXQnKS5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpO1xuICAgICAgICAgIGZpZWxkLmZpbmQoJ3RleHRhcmVhJykucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmaWVsZERhdGEubGFiZWwpIHtcbiAgICAgICAgICBmaWVsZC5maW5kKCdbZGF0YS1lbGVtZW50PWxhYmVsXScpLnZhbChmaWVsZERhdGEubGFiZWwpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZpZWxkRGF0YS5kZWZhdWx0KSB7XG4gICAgICAgICAgZmllbGQuZmluZCgnW2RhdGEtZWxlbWVudD1kZWZhdWx0XScpLnZhbChmaWVsZERhdGEuZGVmYXVsdCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZmllbGREYXRhLnJlcXVpcmVkKSB7XG4gICAgICAgICAgZmllbGQuZmluZCgnLnRsX19oaWRkZW4nKS5hZGRDbGFzcygndGxfX2Rpc2FibGVkJyk7XG4gICAgICAgICAgZmllbGQuZmluZCgnW2RhdGEtZWxlbWVudD1yZXF1aXJlZFRydWVdJykuYXR0cignY2hlY2tlZCcsICdjaGVja2VkJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZmllbGREYXRhLmhpZGRlbikge1xuICAgICAgICAgIGZpZWxkLmZpbmQoJy50bF9fcmVxdWlyZWQnKS5hZGRDbGFzcygndGxfX2Rpc2FibGVkJyk7XG4gICAgICAgICAgZmllbGQuZmluZCgnW2RhdGEtZWxlbWVudD1oaWRkZW5UcnVlXScpLmF0dHIoJ2NoZWNrZWQnLCAnY2hlY2tlZCcpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIGZvcm1cbiAgICogQHJldHVybnMge3t9fVxuICAgKi9cbiAgZ2V0Rm9ybURhdGEoZm9ybSkge1xuICAgIGNvbnN0IHVuaW5kZXhlZEFycmF5ID0gZm9ybS5zZXJpYWxpemVBcnJheSgpO1xuICAgIGNvbnN0IGluZGV4ZWRBcnJheSA9IHt9O1xuXG4gICAgalF1ZXJ5Lm1hcCh1bmluZGV4ZWRBcnJheSwgKG4pID0+IHtcbiAgICAgIGluZGV4ZWRBcnJheVtuLm5hbWVdID0gbi52YWx1ZTtcbiAgICB9KTtcblxuICAgIHJldHVybiBpbmRleGVkQXJyYXk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIGVsXG4gICAqIEBwYXJhbSBpZFxuICAgKi9cbiAgYmluZFNhdmVGb3JtKGVsLCBpZCkge1xuICAgIGVsLmNsaWNrKCgpID0+IHtcbiAgICAgIGNvbnN0IGZvcm0gPSBlbC5jbG9zZXN0KCdmb3JtJyk7XG4gICAgICBjb25zdCB0aXRsZSA9IGZvcm0uZmluZCgnW2RhdGEtZWxlbWVudD1mb3JtVGl0bGVdJyk7XG5cbiAgICAgIGlmICh0aXRsZS52YWwoKSA9PT0gJycpIHtcbiAgICAgICAgdGhpcy5zaG93TWVzc2FnZSgnRm9ybSB0aXRsZSBpcyBlbXB0eScsIGZhbHNlKTtcbiAgICAgICAgdGl0bGUuYWRkQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGl0bGUucmVtb3ZlQ2xhc3MoJ2Vycm9yJyk7XG5cbiAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLmdldEZvcm1EYXRhKGZvcm0pO1xuICAgICAgZGF0YS5hY3Rpb24gPSAndGVhbWxlYWRlcl9zYXZlJztcbiAgICAgIGRhdGEubm9uY2UgPSB0aGlzLm5vbmNlO1xuICAgICAgZGF0YS5pZCA9IGlkO1xuXG4gICAgICBjb25zdCBzdWNjZXNzID0gKCkgPT4ge1xuICAgICAgICB0aGlzLmdldEVsZW1lbnQoJ1tkYXRhLWNvbnRhaW5lcj1lZGl0XScpLmZhZGVPdXQoKTtcbiAgICAgICAgdGhpcy5zaG93TWVzc2FnZSgnRm9ybSBzYXZlZCcpO1xuICAgICAgICB0aGlzLmdldEVsZW1lbnQoYFtkYXRhLWVsZW1lbnQ9Zm9ybSR7aWR9XWApXG4gICAgICAgICAgLmZpbmQoJ1tkYXRhLWVsZW1lbnQ9Zm9ybVRpdGxlXScpLnRleHQodGl0bGUudmFsKCkpO1xuICAgICAgfTtcblxuICAgICAgalF1ZXJ5LmFqYXgoe1xuICAgICAgICB1cmw6IHRoaXMudXJsLFxuICAgICAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICAgICAgZGF0YSxcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgc3VjY2VzczogKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgdGhpcy5zaG93TWVzc2FnZShyZXNwb25zZS5tZXNzYWdlKTtcbiAgICAgICAgICBpZiAocmVzcG9uc2Uuc3VjY2VzcyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgc3VjY2VzcygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6ICgpID0+IHtcbiAgICAgICAgICB0aGlzLnNob3dNZXNzYWdlKCdTZXJ2ZXIgZXJyb3IuIFBsZWFzZSwgdHJ5IGFnYWluJyk7XG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gZWxcbiAgICovXG4gIGJpbmRTYXZlTmV3Rm9ybShlbCkge1xuICAgIGVsLmNsaWNrKCgpID0+IHtcbiAgICAgIGNvbnN0IGZvcm0gPSBlbC5jbG9zZXN0KCdmb3JtJyk7XG4gICAgICBjb25zdCB0aXRsZSA9IGZvcm0uZmluZCgnW2RhdGEtZWxlbWVudD1mb3JtVGl0bGVdJyk7XG5cbiAgICAgIGlmICh0aXRsZS52YWwoKSA9PT0gJycpIHtcbiAgICAgICAgdGhpcy5zaG93TWVzc2FnZSgnRm9ybSB0aXRsZSBpcyBlbXB0eScsIGZhbHNlKTtcbiAgICAgICAgdGl0bGUuYWRkQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGl0bGUucmVtb3ZlQ2xhc3MoJ2Vycm9yJyk7XG5cbiAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLmdldEZvcm1EYXRhKGZvcm0pO1xuICAgICAgZGF0YS5hY3Rpb24gPSAndGVhbWxlYWRlcl9jcmVhdGUnO1xuICAgICAgZGF0YS5ub25jZSA9IHRoaXMubm9uY2U7XG5cbiAgICAgIGNvbnN0IHN1Y2Nlc3MgPSAoaWQpID0+IHtcbiAgICAgICAgdGhpcy5nZXRFbGVtZW50KCdbZGF0YS1jb250YWluZXI9Y3JlYXRlXScpLmZhZGVPdXQoKTtcbiAgICAgICAgdGhpcy5nZXRFbGVtZW50KCdbZGF0YS1hY3Rpb249Y3JlYXRlRm9ybV0nKS5mYWRlSW4oJ25vcm1hbCcpO1xuICAgICAgICB0aGlzLnNob3dNZXNzYWdlKCdGb3JtIGFkZGVkJyk7XG5cbiAgICAgICAgdGhpcy5kaXNwbGF5TmV3Rm9ybShpZCwgdGl0bGUudmFsKCkpO1xuICAgICAgfTtcblxuICAgICAgalF1ZXJ5LmFqYXgoe1xuICAgICAgICB1cmw6IHRoaXMudXJsLFxuICAgICAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICAgICAgZGF0YSxcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgc3VjY2VzczogKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgdGhpcy5zaG93TWVzc2FnZShyZXNwb25zZS5tZXNzYWdlKTtcbiAgICAgICAgICBpZiAocmVzcG9uc2Uuc3VjY2VzcyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgc3VjY2VzcyhyZXNwb25zZS5pZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogKCkgPT4ge1xuICAgICAgICAgIHRoaXMuc2hvd01lc3NhZ2UoJ1NlcnZlciBlcnJvci4gUGxlYXNlLCB0cnkgYWdhaW4nKTtcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSBpZFxuICAgKiBAcGFyYW0gdGl0bGVcbiAgICovXG4gIGRpc3BsYXlOZXdGb3JtKGlkLCB0aXRsZSkge1xuICAgIGNvbnN0IGZvcm0gPSBqUXVlcnkoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JykpO1xuICAgIGNvbnN0IHRlbXBsYXRlID0gdGhpcy5nZXRFbGVtZW50KCcjdGVtcGxhdGVGb3JtJykuaHRtbCgpO1xuXG4gICAgZm9ybS5odG1sKHRlbXBsYXRlKTtcbiAgICBmb3JtLmhpZGUoKTtcblxuICAgIGZvcm0uZmluZCgnW2RhdGEtZWxlbWVudD10aXRsZV0nKS5odG1sKHRpdGxlKTtcbiAgICBmb3JtLmZpbmQoJ1tkYXRhLWVsZW1lbnQ9aWRdJykuaHRtbChpZCk7XG4gICAgZm9ybS5maW5kKCdbZGF0YS1hY3Rpb249ZWRpdEZvcm1dJykuZGF0YSgncGFyYW0nLCBpZCk7XG4gICAgZm9ybS5maW5kKCdbZGF0YS1hY3Rpb249ZGVsZXRlRm9ybV0nKS5kYXRhKCdwYXJhbScsIGlkKTtcblxuICAgIHRoaXMuZm9ybXMucHVzaChmb3JtKTtcblxuICAgIHRoaXMuZ2V0RWxlbWVudCgnW2RhdGEtY29udGFpbmVyPWZvcm1zXScpLmFwcGVuZChmb3JtKTtcbiAgICBmb3JtLmZhZGVJbignbm9ybWFsJyk7XG4gICAgdGhpcy5iaW5kRGVsZXRlRm9ybSgpO1xuICAgIHRoaXMuYmluZEVkaXRGb3JtKCk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIGVsXG4gICAqL1xuICBiaW5kRGlzY2FyZE5ld0Zvcm0oZWwpIHtcbiAgICBlbC5jbGljaygoKSA9PiB7XG4gICAgICB0aGlzLmdldEVsZW1lbnQoJ1tkYXRhLWNvbnRhaW5lcj1jcmVhdGVdJykuZmFkZU91dCgpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSBlbFxuICAgKi9cbiAgYmluZERpc2NhcmRGb3JtKGVsKSB7XG4gICAgZWwuY2xpY2soKCkgPT4ge1xuICAgICAgdGhpcy5nZXRFbGVtZW50KCdbZGF0YS1jb250YWluZXI9ZWRpdF0nKS5mYWRlT3V0KCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICovXG4gIGJpbmRTYXZlT3B0aW9ucygpIHtcbiAgICBjb25zdCBidXR0b24gPSB0aGlzLmdldEVsZW1lbnQoJ1tkYXRhLWFjdGlvbj1zYXZlLW9wdGlvbnNdJyk7XG5cbiAgICBidXR0b24uY2xpY2soKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuc2F2ZU9wdGlvbnMoYnV0dG9uKTtcbiAgICB9KTtcbiAgfVxuXG4gIHNhdmVPcHRpb25zKGJ1dHRvbikge1xuICAgIGNvbnN0IGZvcm0gPSBidXR0b24uY2xvc2VzdCgnZm9ybScpO1xuICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICBhY3Rpb246ICd0ZWFtbGVhZGVyX29wdGlvbnMnLFxuICAgICAgbm9uY2U6IHRoaXMubm9uY2UsXG4gICAgfTtcblxuICAgIGpRdWVyeShmb3JtLnNlcmlhbGl6ZUFycmF5KCkpLmVhY2goKGksIGVsKSA9PiB7XG4gICAgICBkYXRhW2VsLm5hbWVdID0gZWwudmFsdWU7XG4gICAgfSk7XG5cbiAgICBqUXVlcnkuYWpheCh7XG4gICAgICB1cmw6IHRoaXMudXJsLFxuICAgICAgbWV0aG9kOiAncG9zdCcsXG4gICAgICBkYXRhLFxuICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgIHN1Y2Nlc3M6IChyZXNwb25zZSkgPT4ge1xuICAgICAgICB0aGlzLnNob3dNZXNzYWdlKHJlc3BvbnNlLm1lc3NhZ2UpO1xuICAgICAgfSxcbiAgICAgIGVycm9yOiAocmVzcG9uc2UpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgICB0aGlzLnNob3dNZXNzYWdlKCdTZXJ2ZXIgZXJyb3IuIFBsZWFzZSwgdHJ5IGFnYWluJyk7XG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgYmluZEFjdGl2YXRlRmllbGQoZWwpIHtcbiAgICBlbC5jbGljaygoZSkgPT4ge1xuICAgICAgY29uc3QgY2hlY2tib3ggPSBqUXVlcnkoZS50YXJnZXQpO1xuICAgICAgY29uc3QgZmllbGQgPSBjaGVja2JveC5jbG9zZXN0KCcudGxfX2ZpZWxkJyk7XG5cbiAgICAgIGlmIChjaGVja2JveC5hdHRyKCdjaGVja2VkJykgPT09ICdjaGVja2VkJykge1xuICAgICAgICBmaWVsZC5yZW1vdmVDbGFzcygndGxfX2Rpc2FibGVkJyk7XG4gICAgICAgIGZpZWxkLmZpbmQoJ2lucHV0JykucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcbiAgICAgICAgZmllbGQuZmluZCgndGV4dGFyZWEnKS5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZmllbGQuYWRkQ2xhc3MoJ3RsX19kaXNhYmxlZCcpO1xuICAgICAgICBmaWVsZC5maW5kKCdpbnB1dCcpLmF0dHIoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG4gICAgICAgIGZpZWxkLmZpbmQoJ3RleHRhcmVhJykuYXR0cignZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gZWxcbiAgICovXG4gIGJpbmRIaWRkZW5GaWVsZChlbCkge1xuICAgIGVsLmNsaWNrKChlKSA9PiB7XG4gICAgICBjb25zdCBoaWRkZW5SYWRpbyA9IGpRdWVyeShlLnRhcmdldCk7XG4gICAgICBjb25zdCByZXF1aXJlZENvbnRhaW5lciA9IGhpZGRlblJhZGlvLmNsb3Nlc3QoJy50bF9fZmllbGQnKVxuICAgICAgICAuZmluZCgnLnRsX19yZXF1aXJlZCcpO1xuICAgICAgY29uc3QgcmVxdWlyZWRSYWRpbyA9IHJlcXVpcmVkQ29udGFpbmVyLmZpbmQoJ2lucHV0Jyk7XG5cbiAgICAgIHJlcXVpcmVkQ29udGFpbmVyLnJlbW92ZUNsYXNzKCd0bF9fZGlzYWJsZWQnKTtcbiAgICAgIHJlcXVpcmVkUmFkaW8ucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcblxuICAgICAgaWYgKGhpZGRlblJhZGlvLnZhbCgpID09PSAnMScpIHtcbiAgICAgICAgcmVxdWlyZWRSYWRpby5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuICAgICAgICByZXF1aXJlZENvbnRhaW5lci5hZGRDbGFzcygndGxfX2Rpc2FibGVkJyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIGVsXG4gICAqL1xuICBiaW5kUmVxdWlyZWRGaWVsZChlbCkge1xuICAgIGVsLmNsaWNrKChlKSA9PiB7XG4gICAgICBjb25zdCByZXF1aXJlZFJhZGlvID0galF1ZXJ5KGUudGFyZ2V0KTtcbiAgICAgIGNvbnN0IGhpZGRlbkNvbnRhaW5lciA9IHJlcXVpcmVkUmFkaW8uY2xvc2VzdCgnLnRsX19maWVsZCcpXG4gICAgICAgIC5maW5kKCcudGxfX2hpZGRlbicpO1xuICAgICAgY29uc3QgaGlkZGVuUmFkaW8gPSBoaWRkZW5Db250YWluZXIuZmluZCgnaW5wdXQnKTtcblxuICAgICAgaGlkZGVuQ29udGFpbmVyLnJlbW92ZUNsYXNzKCd0bF9fZGlzYWJsZWQnKTtcbiAgICAgIGhpZGRlblJhZGlvLnJlbW92ZUF0dHIoJ2Rpc2FibGVkJyk7XG5cbiAgICAgIGlmIChyZXF1aXJlZFJhZGlvLnZhbCgpID09PSAnMScpIHtcbiAgICAgICAgaGlkZGVuQ29udGFpbmVyLmFkZENsYXNzKCd0bF9fZGlzYWJsZWQnKTtcbiAgICAgICAgaGlkZGVuUmFkaW8uYXR0cignZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcmV0dXJucyB7QXBwfVxuICAgKi9cbiAgYmluZERlbGV0ZUZvcm0oKSB7XG4gICAgY29uc3QgYnV0dG9ucyA9IHRoaXMuZ2V0RWxlbWVudCgnW2RhdGEtYWN0aW9uPWRlbGV0ZUZvcm1dJyk7XG4gICAgYnV0dG9ucy51bmJpbmQoKTtcbiAgICBidXR0b25zLmNsaWNrKChlKSA9PiB7XG4gICAgICBjb25zdCBidXR0b24gPSBqUXVlcnkoZS50YXJnZXQpO1xuICAgICAgdGhpcy5kZWxldGVGb3JtKGJ1dHRvbik7XG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIGJ1dHRvblxuICAgKi9cbiAgZGVsZXRlRm9ybShidXR0b24pIHtcbiAgICBqUXVlcnkuYWpheCh7XG4gICAgICB1cmw6IHRoaXMudXJsLFxuICAgICAgbWV0aG9kOiAncG9zdCcsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIGFjdGlvbjogJ3RlYW1sZWFkZXJfZGVsZXRlJyxcbiAgICAgICAgbm9uY2U6IHRoaXMubm9uY2UsXG4gICAgICAgIGlkOiBidXR0b24uZGF0YSgncGFyYW0nKSxcbiAgICAgIH0sXG4gICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgc3VjY2VzczogKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIHRoaXMuc2hvd01lc3NhZ2UocmVzcG9uc2UubWVzc2FnZSk7XG5cbiAgICAgICAgaWYgKHJlc3BvbnNlLnN1Y2Nlc3MgPT09IHRydWUpIHtcbiAgICAgICAgICBidXR0b24uY2xvc2VzdCgnW2RhdGEtZWxlbWVudD1mb3JtXScpLmZhZGVPdXQoJ25vcm1hbCcpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZXJyb3I6IChyZXNwb25zZSkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgICAgIHRoaXMuc2hvd01lc3NhZ2UoJ1NlcnZlciBlcnJvci4gUGxlYXNlLCB0cnkgYWdhaW4nKTtcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICBiaW5kRWRpdEZvcm0oKSB7XG4gICAgY29uc3QgYnV0dG9ucyA9IHRoaXMuZ2V0RWxlbWVudCgnW2RhdGEtYWN0aW9uPWVkaXRGb3JtXScpO1xuXG4gICAgYnV0dG9ucy5jbGljaygoZSkgPT4ge1xuICAgICAgY29uc3QgYnV0dG9uID0galF1ZXJ5KGUudGFyZ2V0KTtcbiAgICAgIHRoaXMuZWRpdEZvcm0oYnV0dG9uLmRhdGEoJ3BhcmFtJykpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIG1lc3NhZ2VcbiAgICogQHBhcmFtIHN1Y2Nlc3NcbiAgICovXG4gIHNob3dNZXNzYWdlKG1lc3NhZ2UgPSAnJywgc3VjY2Vzcykge1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuZ2V0RWxlbWVudCgnW2RhdGEtYWN0aW9uPW1lc3NhZ2VdJyk7XG4gICAgY29udGFpbmVyLmh0bWwobWVzc2FnZSk7XG5cbiAgICBjb250YWluZXIucmVtb3ZlQ2xhc3MoJ3N1Y2Nlc3MgZXJyb3InKTtcblxuICAgIGlmIChzdWNjZXNzID09PSB0cnVlKSB7XG4gICAgICBjb250YWluZXIuYWRkQ2xhc3MoJ3N1Y2Nlc3MnKTtcbiAgICB9IGVsc2UgaWYgKHN1Y2Nlc3MgPT09IGZhbHNlKSB7XG4gICAgICBjb250YWluZXIuYWRkQ2xhc3MoJ2ZhaWxlZCcpO1xuICAgIH1cbiAgICBjb250YWluZXIuYWRkQ2xhc3MoJ3N0YXR1cycpLmZhZGVJbignbm9ybWFsJyk7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGNvbnRhaW5lci5mYWRlT3V0KCdub3JtYWwnKS5odG1sKCcnKTtcbiAgICB9LCA1MDAwKTtcbiAgfVxufVxuXG5jb25zdCBUZWFtbGVhZGVyQWRtaW4gPSAob3B0aW9ucykgPT4ge1xuICBuZXcgQWRtaW4ob3B0aW9ucyk7XG59O1xuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tdW5kZWYsbm8tY29uc29sZSAqL1xuLyoqXG4gKiBnbG9iYWwgZG9jdW1lbnQsICRcbiAqL1xuY2xhc3MgRnJvbnQge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgdGhpcy51cmwgPSBvcHRpb25zLnVybDtcbiAgICB0aGlzLm5vbmNlID0gb3B0aW9ucy5ub25jZTtcbiAgICB0aGlzLmNvbnRhaW5lciA9IG9wdGlvbnMuY29udGFpbmVyO1xuICAgIHRoaXMuZm9ybSA9IHRoaXMuY29udGFpbmVyLmZpbmQoJ2Zvcm0nKTtcbiAgICB0aGlzLnN1Y2Nlc3MgPSB0aGlzLmNvbnRhaW5lci5maW5kKCdbZGF0YS1zdWNjZXNzXScpO1xuICAgIHRoaXMuZXJyb3IgPSB0aGlzLmNvbnRhaW5lci5maW5kKCdbZGF0YS1lcnJvcl0nKTtcbiAgICB0aGlzLnRpbWVvdXQgPSAxMDAwMDtcblxuICAgIHRyeSB7XG4gICAgICB0aGlzLmluaXQoKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmxvZyhgRXJyb3I6JHtlfWApO1xuICAgIH1cbiAgfVxuICBzZW5kKCkge1xuICAgIGNvbnN0IGRhdGEgPSBgYWN0aW9uPXRlYW1sZWFkZXImbm9uY2U9JHt0aGlzLm5vbmNlfSYke3RoaXMuZm9ybS5zZXJpYWxpemUoKX1gO1xuICAgIGxldCBoYXNFcnJvciA9IGZhbHNlO1xuXG4gICAgdGhpcy5mb3JtLmZpbmQoJ2lucHV0JykuZWFjaCgoaSwgZWwpID0+IHtcbiAgICAgIGNvbnN0IGlucHV0ID0galF1ZXJ5KGVsKTtcblxuICAgICAgaWYgKGlucHV0LnByb3AoJ3JlcXVpcmVkJykgJiYgaW5wdXQudmFsKCkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGlucHV0LmFkZENsYXNzKCdpbnZhbGlkJyk7XG4gICAgICAgIGhhc0Vycm9yID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlucHV0LnJlbW92ZUNsYXNzKCdpbnZhbGlkJyk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAoaGFzRXJyb3IpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBqUXVlcnkuYWpheCh7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIHVybDogdGhpcy51cmwsXG4gICAgICBkYXRhLFxuICAgICAgc3VjY2VzczogKHJlc3VsdCkgPT4ge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGpRdWVyeS5wYXJzZUpTT04ocmVzdWx0KTtcblxuICAgICAgICBpZiAocmVzcG9uc2Uuc3VjY2VzcyA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHRoaXMuZm9ybS5oaWRlKCk7XG4gICAgICAgICAgdGhpcy5lcnJvci5oaWRlKCk7XG4gICAgICAgICAgdGhpcy5zdWNjZXNzLmZhZGVJbigpO1xuXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnN1Y2Nlc3MuZmFkZU91dCgpO1xuICAgICAgICAgICAgdGhpcy5mb3JtLmZhZGVJbigpO1xuICAgICAgICAgIH0sIHRoaXMudGltZW91dCk7XG5cbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmZvcm0uaGlkZSgpO1xuICAgICAgICB0aGlzLnN1Y2Nlc3MuaGlkZSgpO1xuICAgICAgICB0aGlzLmVycm9yLmZhZGVJbigpO1xuXG4gICAgICAgIGlmIChyZXNwb25zZS5tZXNzYWdlKSB7XG4gICAgICAgICAgdGhpcy5lcnJvci5odG1sKHJlc3BvbnNlLm1lc3NhZ2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5lcnJvci5mYWRlT3V0KCk7XG4gICAgICAgICAgdGhpcy5mb3JtLmZhZGVJbigpO1xuICAgICAgICB9LCB0aGlzLnRpbWVvdXQpO1xuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuICBpbml0KCkge1xuICAgIHRoaXMuZm9ybS5zdWJtaXQoKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuc2VuZCgpO1xuICAgIH0pO1xuICB9XG59XG5cbmNvbnN0IFRlYW1sZWFkZXJGcm9udCA9IG9wdGlvbnMgPT4gbmV3IEZyb250KG9wdGlvbnMpO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
