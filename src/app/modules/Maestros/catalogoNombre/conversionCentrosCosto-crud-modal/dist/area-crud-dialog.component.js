"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AreaCrudDialogComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var api_1 = require("primeng/api");
var button_1 = require("primeng/button");
var divider_1 = require("primeng/divider");
var inputswitch_1 = require("primeng/inputswitch");
var inputtext_1 = require("primeng/inputtext");
var common_1 = require("@angular/common");
var AreaCrudDialogComponent = /** @class */ (function () {
    function AreaCrudDialogComponent(messageServiceCustom, _dynamicDialogRef, _dynamicDialogConfig, _formBuilder, areasService, ref) {
        var _this = this;
        this.messageServiceCustom = messageServiceCustom;
        this._dynamicDialogRef = _dynamicDialogRef;
        this._dynamicDialogConfig = _dynamicDialogConfig;
        this._formBuilder = _formBuilder;
        this.areasService = areasService;
        this.ref = ref;
        this.formGroup = this._formBuilder.group({
            AreaId: [0, []],
            Code: ['', [forms_1.Validators.required]],
            Name: ['', [forms_1.Validators.required]]
        });
        this.mostrarCampoRequerido = false;
        this.InitCommandHandler = {
            CREATE: function () {
                _this.formGroup.reset();
            },
            EDIT: function (AreasEntidad) {
                _this.formGroup.reset(AreasEntidad);
            },
            DELETE: function (AreasEntidad) {
                _this.formGroup.reset(AreasEntidad);
            }
        };
        this._onSubmitCommandHandler = {
            CREATE: function () {
                if (_this.formGroup.valid) {
                    _this._createReportSubscription = _this.areasService.add(_this.createRequest).subscribe({
                        next: function (response) {
                            _this.messageServiceCustom.showSuccess('Existo', "" + response.message);
                        },
                        error: function (error) {
                            console.log(error);
                            _this.messageServiceCustom.showError('Error', error.error.errores.error[0].descripcion);
                        },
                        complete: function () {
                            _this._dynamicDialogRef.close({
                                refreshTable: true
                            });
                        }
                    });
                }
            },
            EDIT: function () {
                if (_this.formGroup.valid) {
                    _this._createReportSubscription = _this.areasService.update(_this.rolRequest.AreaId, _this.rolRequest).subscribe({
                        next: function (response) {
                            _this.messageServiceCustom.showSuccess('Exitoso', "" + response.message);
                        },
                        error: function (error) {
                            _this.messageServiceCustom.showError('Error', 'Algo salió mal editando el Area');
                        },
                        complete: function () {
                            _this.ref.close();
                        }
                    });
                }
            },
            DELETE: function () {
                if (_this.formGroup.valid) {
                    _this._createReportSubscription = _this.areasService["delete"](_this.rolRequest.AreaId).subscribe({
                        next: function (response) {
                            _this.messageServiceCustom.showSuccess('Exitoso', "" + response.message);
                        },
                        error: function (error) {
                            _this.messageServiceCustom.showError('Oho', error.error.errores.error[0].descripcion, 8000);
                            console.log(error.error.errores.error[0].descripcion);
                        },
                        complete: function () {
                            _this._dynamicDialogRef.close({
                                refreshTable: true
                            });
                        }
                    });
                }
            }
        };
    }
    Object.defineProperty(AreaCrudDialogComponent.prototype, "area", {
        get: function () {
            return this.command.parameters.Name;
        },
        enumerable: false,
        configurable: true
    });
    AreaCrudDialogComponent.prototype.OnSubmit = function () {
        this._onSubmitCommandHandler[this.command.method]();
    };
    Object.defineProperty(AreaCrudDialogComponent.prototype, "createRequest", {
        get: function () {
            var creationRolRequest = this.formGroup.value;
            return creationRolRequest;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AreaCrudDialogComponent.prototype, "rolRequest", {
        get: function () {
            var updateRolRequest = this.formGroup.value;
            return updateRolRequest;
        },
        enumerable: false,
        configurable: true
    });
    AreaCrudDialogComponent.prototype.ngOnInit = function () {
        this.command = this._dynamicDialogConfig.data;
        this.InitCommandHandler[this.command.method](this.command.parameters);
    };
    AreaCrudDialogComponent.prototype.FieldHasErrors = function (controlName) {
        var _a, _b;
        return ((_a = this.formGroup.get(controlName)) === null || _a === void 0 ? void 0 : _a.touched) && ((_b = this.formGroup.get(controlName)) === null || _b === void 0 ? void 0 : _b.errors);
    };
    AreaCrudDialogComponent.prototype.CloseModal = function () {
        this._dynamicDialogRef.close({
            refreshTable: false
        });
    };
    AreaCrudDialogComponent = __decorate([
        core_1.Component({
            selector: 'app-area-crud-dialog',
            standalone: true,
            imports: [
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                button_1.ButtonModule,
                inputtext_1.InputTextModule,
                inputswitch_1.InputSwitchModule,
                divider_1.DividerModule,
                common_1.CommonModule,
            ],
            providers: [api_1.MessageService],
            templateUrl: './area-crud-dialog.component.html'
        })
    ], AreaCrudDialogComponent);
    return AreaCrudDialogComponent;
}());
exports.AreaCrudDialogComponent = AreaCrudDialogComponent;
